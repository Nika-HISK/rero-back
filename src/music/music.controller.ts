import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MusicService } from './music.service';
import { Role } from 'src/auth/guard/enum/role.enum';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { S3Service } from 'src/s3/s3.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    private readonly s3Service: S3Service,
  ) {}

  @Roles(Role.USER, Role.ADMIN)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async uploadFile(
    @UploadedFiles() files: { image?: Express.Multer.File[], audio?: Express.Multer.File[] },
    @Body() createMusicDto: CreateMusicDto,
  ) {
    console.log('Files received:', files);
    
    if (!files || (!files.image && !files.audio)) {
      console.log('No files uploaded');
      throw new BadRequestException('No files uploaded');
    }
  
    const bucket = process.env.AWS_S3_BUCKET; 
    const imageKey = `images/${uuidv4()}_${files.image[0].originalname}`;
    const audioKey = `audios/${uuidv4()}_${files.audio[0].originalname}`;
  
    console.log('Uploading image with key:', imageKey);
    const imageUrl = files.image ? await this.s3Service.uploadFile(files.image[0], bucket, imageKey) : '';
    console.log('Image URL:', imageUrl);
  
    console.log('Uploading audio with key:', audioKey);
    const audioUrl = files.audio ? await this.s3Service.uploadFile(files.audio[0], bucket, audioKey) : '';
    console.log('Audio URL:', audioUrl);
  
    if (!imageUrl || !audioUrl) {
      console.log('File upload failed or file location is undefined');
      throw new BadRequestException('File upload failed or file location is undefined');
    }
  
    createMusicDto.musicImage = imageUrl;
    createMusicDto.musicAudio = audioUrl;
  
    console.log('DTO after file uploads:', createMusicDto);
  
    return this.musicService.create(createMusicDto);
  }
  @Roles(Role.USER, Role.ADMIN)
  @Post()
  async create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  async findAll() {
    return this.musicService.findAll();
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.musicService.findOne(Number(id));
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return this.musicService.update(Number(id), updateMusicDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.musicService.remove(Number(id));
  }
}
