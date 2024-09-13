import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { ArtistRepository } from './repositories/artist.repository';
import { FilesService } from 'src/files/files.service';
import { S3Service } from 'src/aws/services/s3.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly filesService: FilesService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.create(createArtistDto);
  }
  async getArtistPhotoUrl(key: string): Promise<string> {
    return this.s3Service.getPresignedUrl(key);
  }
  findAll() {
    return this.artistRepository.findAll();
  }

  findOne(id: number) {
    return this.artistRepository.findOne(id);
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.update(id, updateArtistDto);
  }

  delete(id: number) {
    return this.artistRepository.delete(id);
  }
}
