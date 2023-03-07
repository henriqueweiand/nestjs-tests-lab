import { Test, TestingModule } from '@nestjs/testing';

import { OrdersService } from './orders.service';
import { orderStub } from './test/stubs/orders.stubs';
import { OrdersRepository } from './orders.repository';
import { Orders } from './entities/orders.entity';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

jest.mock('./orders.repository');

describe('OrdersService', () => {
  let orderServices: OrdersService;
  let ordersRepository: OrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersRepository, OrdersService],
    }).compile();

    orderServices = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(orderServices).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let orderCreated: Orders;
      let createDto: CreateDto;

      beforeEach(async () => {
        createDto = {
          email: orderStub().email,
          currencyFrom: orderStub().currencyFrom,
          currencyTo: orderStub().currencyTo,
          valueFrom: orderStub().valueFrom,
          valueTo: orderStub().valueTo,
          comment: orderStub().comment,
        };

        orderCreated = await orderServices.create(createDto);
      });

      test('then it should call repository.create', () => {
        expect(ordersRepository.create).toBeCalledWith(createDto);
      });

      test('then is should return a order', () => {
        expect(orderCreated).toEqual(orderStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let orders: Orders[];

      beforeEach(async () => {
        orders = await orderServices.findAll();
      });

      test('then it should call repository.find', () => {
        expect(ordersRepository.find).toBeCalledWith({});
      });

      test('then is should return an array of orders', () => {
        expect(orders).toEqual([orderStub()]);
      });
    });
  });

  describe('findById', () => {
    describe('when findById is called', () => {
      let order: Orders;

      beforeEach(async () => {
        order = await orderServices.findById('abcd');
      });

      test('then it should call repository.findById', () => {
        expect(ordersRepository.findById).toBeCalledWith('abcd');
      });

      test('then is should return an order', () => {
        expect(order).toEqual(orderStub());
      });

      test('then it should show an error message', async () => {
        await expect(orderServices.findById('')).rejects.toThrow();
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let order: Orders;
      let updateDto: UpdateDto;

      beforeEach(async () => {
        updateDto = {
          _id: '63e4ea632dd0fa8587b57985',
          email: orderStub().email,
          currencyFrom: orderStub().currencyFrom,
          currencyTo: orderStub().currencyTo,
          valueFrom: orderStub().valueFrom,
          valueTo: orderStub().valueTo,
          comment: orderStub().comment,
        };
        order = await orderServices.update(updateDto._id, updateDto);
      });

      test('then it should call repository.findOneAndUpdate', () => {
        expect(ordersRepository.findOneAndUpdate).toBeCalledWith(
          { id: updateDto._id },
          updateDto,
        );
      });

      test('then is should return an order updated', () => {
        expect(order).toEqual(orderStub());
      });

      test('then it should show an error message', async () => {
        await expect(orderServices.update('', updateDto)).rejects.toThrow();
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      let orderDeleted: boolean;
      const id = '63e4ea632dd0fa8587b57985';

      beforeEach(async () => {
        orderDeleted = await orderServices.delete(id);
      });

      test('then it should call repository.deleteMany', () => {
        expect(ordersRepository.deleteMany).toBeCalledWith({ _id: id });
      });

      test('then is should return an order deleted', () => {
        expect(orderDeleted).toEqual(true);
      });

      test('then it should show an error message', async () => {
        await expect(orderServices.delete('')).rejects.toThrow();
      });
    });
  });
});
