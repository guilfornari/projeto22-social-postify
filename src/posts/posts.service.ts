import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { NotFoundError } from '../errors/notfoundError';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostsRepository) { }

  async createPost(createPostDto: CreatePostDto) {
    return await this.postRepository.createPost(createPostDto);
  }

  async findAllPosts() {
    return await this.postRepository.findAllPosts();
  }

  async findOnePost(id: number) {
    const post = await this.postRepository.findOnePost(id);
    if (!post) throw new NotFoundError(id);
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOnePost(id);
    if (!post) throw new NotFoundError(id);
    return await this.postRepository.updatePost(id, updatePostDto);
  }

  async removePost(id: number) {
    const post = await this.postRepository.findOnePost(id);
    if (!post) throw new NotFoundError(id);
    return await this.postRepository.removePost(id);
  }
}
