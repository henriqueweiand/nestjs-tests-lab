import { orderStub } from '../test/stubs/orders.stubs';

export const OrdersRepository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(orderStub()),
  find: jest.fn().mockResolvedValue([orderStub()]),
  findById: jest.fn().mockResolvedValue(orderStub()),
  create: jest.fn().mockResolvedValue(orderStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(orderStub()),
  deleteMany: jest.fn().mockResolvedValue(true),
});
