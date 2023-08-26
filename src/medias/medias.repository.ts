import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class MediasRepository {

  constructor(private prisma: PrismaService) { }

  createMedia(createMediaDto: CreateMediaDto) {
    return this.prisma.media.create({
      data: createMediaDto
    });
  }

  findMediaByNameAndUsername(createMediaDto: CreateMediaDto | UpdateMediaDto) {
    return this.prisma.media.findFirst({
      where: {
        title: createMediaDto.title,
        username: createMediaDto.username
      }
    });
  }

  findAllMedia() {
    return this.prisma.media.findMany();
  }

  findOneMedia(id: number) {
    return this.prisma.media.findUnique({
      where: { id }
    });
  }

  updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    return this.prisma.media.update({
      where: { id },
      data: {
        title: updateMediaDto.title,
        username: updateMediaDto.username
      }
    });
  }

  removeMedia(id: number) {
    return this.prisma.media.delete({
      where: { id }
    });
  }
}
