import { articleStub } from '../test/stubs/articles.stubs';

export const ArticlesService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(articleStub()),
  findAll: jest.fn().mockResolvedValue([articleStub()]),
  findById: jest.fn().mockResolvedValue(articleStub()),
  update: jest.fn().mockResolvedValue(articleStub()),
  delete: jest.fn().mockResolvedValue(true),
});
