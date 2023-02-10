import { Injectable } from '@nestjs/common';
import { ArticleDocument } from './schemas/articles.schema';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { ArticlesRepository } from './articles.repository';

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
    return this.articlesRepository.findById(id);
  }

  public async update(id: string, updateDto: UpdateDto) {
    return this.articlesRepository.findOneAndUpdate({ id }, updateDto);
  }

  public async delete(id: string) {
    return this.articlesRepository.deleteMany({ _id: id });
  }
}
