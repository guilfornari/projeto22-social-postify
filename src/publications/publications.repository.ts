import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PublicationsRepository {

  constructor(private prisma: PrismaService) { }

  createPublication(createPublicationDto: CreatePublicationDto) {
    return this.prisma.publication.create({
      data: createPublicationDto
    });
  }

  findAllPublications() {
    return this.prisma.publication.findMany();
  }

  findOnePublication(id: number) {
    return this.prisma.publication.findUnique({
      where: { id }
    });
  }

  updatePublication(id: number, updatePublicationDto: UpdatePublicationDto) {
    return this.prisma.publication.update({
      where: { id },
      data: {
        mediaId: updatePublicationDto.mediaId,
        postId: updatePublicationDto.postId,
        date: updatePublicationDto.date
      }
    });
  }

  removePublication(id: number) {
    return this.prisma.publication.delete({
      where: { id }
    });
  }

  findOnePublicationByMediaId(id: number) {
    return this.prisma.publication.findFirst({
      where: {
        mediaId: id
      }
    });
  }

  findOnePublicationByPostId(id: number) {
    return this.prisma.publication.findFirst({
      where: {
        postId: id
      }
    });
  }
}

