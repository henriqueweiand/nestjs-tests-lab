import { orderStub } from '../test/stubs/orders.stubs';

export const OrdersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(orderStub()),
  findAll: jest.fn().mockResolvedValue([orderStub()]),
  findById: jest.fn().mockResolvedValue(orderStub()),
  update: jest.fn().mockResolvedValue(orderStub()),
  delete: jest.fn().mockResolvedValue(true),
});
