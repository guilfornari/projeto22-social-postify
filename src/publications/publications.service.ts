import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { MediasRepository } from '../medias/medias.repository';
import { NotFoundError } from '../errors/notfoundError';
import { PostsRepository } from '../posts/posts.repository';
import { ForbiddenError } from '../errors/forbiddenError';

@Injectable()
export class PublicationsService {
  constructor(
    private publicationRepository: PublicationsRepository,
    private mediaRepository: MediasRepository,
    private postRepository: PostsRepository) { }

  async createPublication(createPublicationDto: CreatePublicationDto) {
    const mediaId = await this.mediaRepository.findOneMedia(createPublicationDto.mediaId);
    if (!mediaId) throw new NotFoundError(createPublicationDto.mediaId);
    const postId = await this.postRepository.findOnePost(createPublicationDto.postId);
    if (!postId) throw new NotFoundError(createPublicationDto.postId);

    return await this.publicationRepository.createPublication(createPublicationDto);
  }

  async findAllPublications() {
    return await this.publicationRepository.findAllPublications();
  }

  async findOnePublication(id: number) {
    const publication = await this.publicationRepository.findOnePublication(id);
    if (!publication) throw new NotFoundError(id);
    return publication;
  }

  async updatePublication(id: number, updatePublicationDto: UpdatePublicationDto) {
    const publication = await this.publicationRepository.findOnePublication(id);
    if (!publication) throw new NotFoundError(id);
    if (publication.published === true) throw new ForbiddenError(id);

    const mediaId = await this.mediaRepository.findOneMedia(updatePublicationDto.mediaId);
    if (!mediaId) throw new NotFoundError(updatePublicationDto.mediaId);
    const postId = await this.postRepository.findOnePost(updatePublicationDto.postId);
    if (!postId) throw new NotFoundError(updatePublicationDto.postId);

    return await this.publicationRepository.updatePublication(id, updatePublicationDto);
  }

  async removePublication(id: number) {
    const publication = await this.publicationRepository.findOnePublication(id);
    if (!publication) throw new NotFoundError(id);

    return await this.publicationRepository.removePublication(id);
  }
}
