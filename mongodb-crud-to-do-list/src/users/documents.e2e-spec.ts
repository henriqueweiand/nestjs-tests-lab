import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DocumentsModule } from './documents.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const baseApi = '/documents';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DocumentsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get the collection of documents', () => {
    const response = request(app.getHttpServer()).get(baseApi);
    response.expect(200);
  });

  it('should get one document', () => {
    const response = request(app.getHttpServer()).get(baseApi + '/123456');
    response.expect(200);
  });
});
