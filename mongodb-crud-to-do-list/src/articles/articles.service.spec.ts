import { Test, TestingModule } from '@nestjs/testing';

import { ArticlesService } from './articles.service';
import { articleStub } from './test/stubs/articles.stubs';
import { ArticlesRepository } from './articles.repository';
import { Articles } from './schemas/articles.schema';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

jest.mock('./articles.repository');

describe('ArticlesService', () => {
  let articleServices: ArticlesService;
  let articlesRepository: ArticlesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesRepository, ArticlesService],
    }).compile();

    articleServices = module.get<ArticlesService>(ArticlesService);
    articlesRepository = module.get<ArticlesRepository>(ArticlesRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(articleServices).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let articleCreated: Articles;
      let createDto: CreateDto;

      beforeEach(async () => {
        createDto = {
          title: articleStub().title,
          content: articleStub().content,
        };

        articleCreated = await articleServices.create(createDto);
      });

      test('then it should call repository.create', () => {
        expect(articlesRepository.create).toBeCalledWith(createDto);
      });

      test('then is should return a article', () => {
        expect(articleCreated).toEqual(articleStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let articles: Articles[];

      beforeEach(async () => {
        articles = await articleServices.findAll();
      });

      test('then it should call repository.find', () => {
        expect(articlesRepository.find).toBeCalledWith({});
      });

      test('then is should return an array of articles', () => {
        expect(articles).toEqual([articleStub()]);
      });
    });
  });

  describe('findById', () => {
    describe('when findById is called', () => {
      let article: Articles;

      beforeEach(async () => {
        article = await articleServices.findById('abcd');
      });

      test('then it should call repository.findById', () => {
        expect(articlesRepository.findById).toBeCalledWith('abcd');
      });

      test('then is should return an article', () => {
        expect(article).toEqual(articleStub());
      });

      test('then it should show an error message', async () => {
        await expect(articleServices.findById('')).rejects.toThrow();
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let article: Articles;
      let updateDto: UpdateDto;

      beforeEach(async () => {
        updateDto = {
          _id: '63e4ea632dd0fa8587b57985',
          title: articleStub().title,
          content: articleStub().content,
        };
        article = await articleServices.update(updateDto._id, updateDto);
      });

      test('then it should call repository.findOneAndUpdate', () => {
        expect(articlesRepository.findOneAndUpdate).toBeCalledWith(
          { id: updateDto._id },
          updateDto,
        );
      });

      test('then is should return an article updated', () => {
        expect(article).toEqual(articleStub());
      });

      test('then it should show an error message', async () => {
        await expect(articleServices.update('', updateDto)).rejects.toThrow();
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      let articleDeleted: boolean;
      const id = '63e4ea632dd0fa8587b57985';

      beforeEach(async () => {
        articleDeleted = await articleServices.delete(id);
      });

      test('then it should call repository.deleteMany', () => {
        expect(articlesRepository.deleteMany).toBeCalledWith({ _id: id });
      });

      test('then is should return an article deleted', () => {
        expect(articleDeleted).toEqual(true);
      });

      test('then it should show an error message', async () => {
        await expect(articleServices.delete('')).rejects.toThrow();
      });
    });
  });
});
