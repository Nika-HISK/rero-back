import { Injectable } from "@nestjs/common";
import { AlbumResponseDto } from "./dtos/album-response.dto";
import { CreateAlbumDto } from "./dtos/create-album.dto";
import { UpdateAlbumDto } from "./dtos/update-album.dto";
import { Album } from "./entities/album.entity";
import { AlbumRepository } from "./repositories/album.repository";
import { Artist } from "src/artist/entities/artist.entity";
import { Music } from "src/music/entities/music.entity";
import { MusicResponseDto } from "src/music/dtos/MusicResponseDto";
import { ArtistResponseDto } from "src/artist/dtos/ArtistResponseDto";

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async findAll(): Promise<AlbumResponseDto[]> {
    const albums = await this.albumRepository.findAll();
    return albums.map((album) => this.toResponseDto(album));
  }

  async findOne(id: number): Promise<AlbumResponseDto> {
    const album = await this.albumRepository.findOne(id);
    return this.toResponseDto(album);
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

  private toResponseDto(album: Album): AlbumResponseDto {
    return {
      id: album.id,
      name: album.name,
      releaseDate: album.releaseDate,
      musics: album.musics,
      artist: album.artist,
    };
  }

  private toMusicResponseDto(music: Music): MusicResponseDto {
    return {
      id: music.id,
      name: music.name,
      musicAudio: music.musicAudio,
      coverImage: music.coverImage,
      duration: music.duration,
      artistId: music.artistId,
    };
  }

  private toArtistResponseDto(artist: Artist): ArtistResponseDto {
    return {
      id: artist.id,
      artistName: artist.artistName,
      biography: artist.biography,
      artistPhoto: artist.artistPhoto,
    };
  }
}
