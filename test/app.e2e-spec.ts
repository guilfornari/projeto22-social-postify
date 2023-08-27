import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import dayjs from 'dayjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = await moduleFixture.resolve(PrismaService);
    await prisma.publication.deleteMany();
    await prisma.media.deleteMany();
    await prisma.post.deleteMany();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });

  it('/ (Post)', () => {
    return request(app.getHttpServer())
      .post('/medias')
      .send({
        title: "Facegram",
        username: "Jon Doe"
      })
      .expect(201);
  });

  it('GET /posts', async () => {
    await prisma.post.create({
      data: {
        title: "How to test?",
        text: "Just do it!",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png"
      }
    });

    const response = await request(app.getHttpServer()).get('/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('UPDATE /publications', async () => {
    const media = await prisma.media.create({
      data: {
        title: "Facegram",
        username: "Just do it!",
      }
    });

    const post = await prisma.post.create({
      data: {
        title: "How to test?",
        text: "Just do it!",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png"
      }
    });

    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: new Date(),
        published: false
      }
    });

    let response = await request(app.getHttpServer())
      .put(`/publications/${publication.id}`)
      .send({
        mediaId: media.id,
        postId: post.id,
        date: new Date(),
        published: true
      });

    console.log(response.text);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: publication.id,
      mediaId: expect.any(Number),
      postId: expect.any(Number),
      date: expect.any(String),
      published: true
    });

  });

});
