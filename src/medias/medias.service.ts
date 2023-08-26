import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import { MediaNotFound } from './errors/media.error.notfound';
import { MediaConflict } from './errors/media.error.conflict';

@Injectable()
export class MediasService {
  constructor(private mediaRepository: MediasRepository) { }

  async createMedia(createMediaDto: CreateMediaDto) {
    const media = await this.mediaRepository.findMediaByNameAndUsername(createMediaDto);
    if (media) throw new MediaConflict(createMediaDto.title, createMediaDto.username);
    return await this.mediaRepository.createMedia(createMediaDto);
  }

  async findAllMedia() {
    return await this.mediaRepository.findAllMedia();
  }

  async findOneMedia(id: number) {
    const media = await this.mediaRepository.findOneMedia(id);
    if (!media) throw new MediaNotFound(id);
    return media;
  }

  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.mediaRepository.findOneMedia(id);
    if (!media) throw new MediaNotFound(id);
    const searchMedia = await this.mediaRepository.findMediaByNameAndUsername(updateMediaDto);
    if (searchMedia) throw new MediaConflict(updateMediaDto.title, updateMediaDto.username);
    return await this.mediaRepository.updateMedia(id, updateMediaDto);
  }

  async removeMedia(id: number) {
    const media = await this.mediaRepository.findOneMedia(id);
    if (!media) throw new MediaNotFound(id);
    return await this.mediaRepository.removeMedia(id);
  }
}
