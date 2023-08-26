import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsRepository {

  constructor(private prisma: PrismaService) { }

  createPost(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: createPostDto
    });
  }

  findAllPosts() {
    return this.prisma.post.findMany();
  }

  findOnePost(id: number) {
    return this.prisma.post.findUnique({
      where: { id }
    });
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        text: updatePostDto.text,
        image: updatePostDto.image
      }
    });
  }

  removePost(id: number) {
    return this.prisma.post.delete({
      where: { id }
    });
  }
}
