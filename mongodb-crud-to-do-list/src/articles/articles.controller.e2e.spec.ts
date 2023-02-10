import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { DatabaseService } from '../database/database.service';
import { AppModule } from '../app.module';
import { CreateDto } from './dto/create.dto';
import { articleStub } from './test/stubs/articles.stubs';

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConnection.collection('articles').deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('articles').deleteMany({});
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      await dbConnection.collection('articles').insertOne(articleStub());
      const response = await request(httpServer).get('/articles');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([articleStub()]);
    });
  });

  describe('create', () => {
    it('should create a article', async () => {
      const createDto: CreateDto = {
        title: articleStub().title,
        content: articleStub().content,
      };
      const response = await request(httpServer)
        .post('/articles')
        .send(createDto);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createDto);

      const user = await dbConnection
        .collection('articles')
        .findOne({ title: createDto.title });
      expect(user).toMatchObject(createDto);
    });
  });
});
