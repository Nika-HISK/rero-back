import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './repositories/album.repository';
import { AlbumResponseDto } from './dtos/album-response.dto';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async findAll(): Promise<AlbumResponseDto[]> {
    const albums = await this.albumRepository.findAll();
    return albums.map(album => this.toResponseDto(album));
  }

  async findOne(id: number): Promise<AlbumResponseDto> {
    const album = await this.albumRepository.findOne(id);
    return this.toResponseDto(album);
  }

  private toResponseDto(album: Album): AlbumResponseDto {
    return {
      id: album.id,
      name: album.name,
      releaseDate: album.releaseDate,
      musics: album.musics,
      artist: album.artist,
    };
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.create(createAlbumDto);
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepository.update(id, updateAlbumDto);
  }

  delete(id: number) {
    return this.albumRepository.delete(id);
  }
}
