import { Injectable } from '@nestjs/common';
import { FilesRepository } from './repositories/files.repository';
import { S3Service } from 'src/aws/services/s3.service';
import * as musicMetadata from 'music-metadata';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3Service: S3Service,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ url: string; key: string; bucket: string }> {
    const fileName = file.originalname;
    const result = await this.s3Service.upload(file, fileName);

    const savedFile = await this.filesRepository.save(
      fileName,
      result.Location,
      result.Key,
      result.Bucket,
    );

    return {
      url: savedFile.url,
      key: savedFile.key,
      bucket: savedFile.bucket,
    };
  }

  async getFileDetails(file: Express.Multer.File): Promise<{ path: string }> {
    return {
      path: file.path,
    };
  }

  async extractAudioDuration(fileBuffer: Buffer): Promise<number> {
    try {
      console.log('Processing file buffer size:', fileBuffer.length);

      const metadata = await musicMetadata.parseBuffer(fileBuffer);

      console.log('Metadata parsed:', metadata);

      const duration = metadata.format.duration;

      if (duration) {
        console.log('Extracted duration:', duration);
        return duration;
      } else {
        throw new Error('Duration not found in metadata');
      }
    } catch (error) {
      console.error(`Error extracting audio duration: ${error.message}`);
      throw error;
    }
  }
}
