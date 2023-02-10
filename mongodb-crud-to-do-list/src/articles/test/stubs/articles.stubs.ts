import { Articles } from '../../schemas/articles.schema';

export const articleStub = (): Articles => ({
  title: 'title test',
  content: 'content test',
});
