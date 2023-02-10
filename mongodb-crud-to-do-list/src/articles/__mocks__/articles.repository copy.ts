import { articleStub } from '../test/stubs/articles.stubs';

export const ArticlesRepository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(articleStub()),
  find: jest.fn().mockResolvedValue([articleStub()]),
  findById: jest.fn().mockResolvedValue(articleStub()),
  create: jest.fn().mockResolvedValue(articleStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(articleStub()),
  deleteMany: jest.fn().mockResolvedValue(true),
});
