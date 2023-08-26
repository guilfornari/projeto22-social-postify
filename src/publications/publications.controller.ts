import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private publicationsService: PublicationsService) { }

  @Post()
  createPublication(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.createPublication(createPublicationDto);
  }

  @Get()
  findAllPublications() {
    return this.publicationsService.findAllPublications();
  }

  @Get(':id')
  findOnePublication(@Param('id') id: string) {
    return this.publicationsService.findOnePublication(+id);
  }

  @Put(':id')
  updatePublication(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.updatePublication(+id, updatePublicationDto);
  }

  @Delete(':id')
  removePublication(@Param('id') id: string) {
    return this.publicationsService.removePublication(+id);
  }
}
