import { Injectable } from '@nestjs/common';
import { ArticleDocument } from './schemas/articles.schema';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { ArticlesRepository } from './articles.repository';
import { ArticleNotFound } from './articles.exception';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  public async create(createDto: CreateDto): Promise<ArticleDocument> {
    return this.articlesRepository.create(createDto);
  }

  public async findAll(): Promise<ArticleDocument[]> {
    return this.articlesRepository.find({});
  }

  public async findById(id: string): Promise<ArticleDocument> {
    if (!!id) {
      return this.articlesRepository.findById(id);
    } else {
      throw new ArticleNotFound();
    }
  }

  public async update(id: string, updateDto: UpdateDto) {
    if (!!id) {
      return this.articlesRepository.findOneAndUpdate({ id }, updateDto);
    } else {
      throw new ArticleNotFound();
    }
  }

  public async delete(id: string) {
    if (!!id) {
      return this.articlesRepository.deleteMany({ _id: id });
    } else {
      throw new ArticleNotFound();
    }
  }
}
