import { Injectable } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from '../s3/s3.config';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File, bucketName: string, key: string): Promise<string> {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
      },
    });

    await upload.done();
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }
}
