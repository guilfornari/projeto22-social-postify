import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private mediasService: MediasService) { }

  @Post()
  createMedia(@Body() createMediaDto: CreateMediaDto) {
    return this.mediasService.createMedia(createMediaDto);
  }

  @Get()
  findAllMedia() {
    return this.mediasService.findAllMedia();
  }

  @Get(':id')
  findOneMedia(@Param('id') id: string) {
    return this.mediasService.findOneMedia(+id);
  }

  @Put(':id')
  updateMedia(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.updateMedia(+id, updateMediaDto);
  }

  @Delete(':id')
  removMedia(@Param('id') id: string) {
    return this.mediasService.removeMedia(+id);
  }
}
