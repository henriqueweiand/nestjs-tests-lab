import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { Orders, OrderDocument } from './entities/orders.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Orders.name)
    private readonly entityModel: Model<OrderDocument>,
  ) {}

  async findOne(
    entityFilterQuery: FilterQuery<OrderDocument>,
    projection?: Record<string, unknown>,
  ): Promise<OrderDocument | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<OrderDocument>,
  ): Promise<OrderDocument[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async findById(id: string): Promise<OrderDocument | null> {
    return this.entityModel.findById(id);
  }

  async create(createEntityData: unknown): Promise<OrderDocument> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<OrderDocument>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<OrderDocument | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteMany(
    entityFilterQuery: FilterQuery<OrderDocument>,
  ): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
