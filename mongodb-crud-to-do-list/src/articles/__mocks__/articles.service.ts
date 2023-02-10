import { articleStub } from '../test/stubs/articles.stubs';

export const ArticlesService = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockResolvedValue(articleStub()),
  getUsers: jest.fn().mockResolvedValue([articleStub()]),
  createUser: jest.fn().mockResolvedValue(articleStub()),
  updateUser: jest.fn().mockResolvedValue(articleStub()),
});
