import { Injectable } from '@nestjs/common';
import { OrderDocument } from './entities/orders.entity';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { OrdersRepository } from './orders.repository';
import { OrderNotFound } from './orders.exception';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async create(createDto: CreateDto): Promise<OrderDocument> {
    return this.ordersRepository.create(createDto);
  }

  public async findAll(): Promise<OrderDocument[]> {
    return this.ordersRepository.find({});
  }

  public async findById(id: string): Promise<OrderDocument> {
    if (!!id) {
      return this.ordersRepository.findById(id);
    } else {
      throw new OrderNotFound();
    }
  }

  public async update(id: string, updateDto: UpdateDto) {
    if (!!id) {
      return this.ordersRepository.findOneAndUpdate({ id }, updateDto);
    } else {
      throw new OrderNotFound();
    }
  }

  public async delete(id: string) {
    if (!!id) {
      return this.ordersRepository.deleteMany({ _id: id });
    } else {
      throw new OrderNotFound();
    }
  }
}
