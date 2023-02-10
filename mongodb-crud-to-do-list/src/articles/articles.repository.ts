import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { Articles, ArticleDocument } from './schemas/articles.schema';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Articles.name)
    private readonly entityModel: Model<ArticleDocument>,
  ) {}

  async findOne(
    entityFilterQuery: FilterQuery<ArticleDocument>,
    projection?: Record<string, unknown>,
  ): Promise<ArticleDocument | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<ArticleDocument>,
  ): Promise<ArticleDocument[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async findById(id: string): Promise<ArticleDocument | null> {
    return this.entityModel.findById(id);
  }

  async create(createEntityData: unknown): Promise<ArticleDocument> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<ArticleDocument>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<ArticleDocument | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteMany(
    entityFilterQuery: FilterQuery<ArticleDocument>,
  ): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
