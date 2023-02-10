import { ArticlesService } from './articles.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesRepository } from './articles.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Articles } from './schemas/articles.schema';
import { Model } from 'mongoose';

jest.mock('./__mocks__/articles.repository');

describe('ArticlesService', () => {
  let articleServices: ArticlesService;
  let articlesRepository: ArticlesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Articles.name),
          useValue: Model,
        },
        ArticlesRepository,
        ArticlesService,
      ],
    }).compile();

    articleServices = module.get<ArticlesService>(ArticlesService);
    articlesRepository = module.get<ArticlesRepository>(ArticlesRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(articleServices).toBeDefined();
  });
});
