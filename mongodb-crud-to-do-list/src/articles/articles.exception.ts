export class ArticleNotFound extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ArticleNotFound';
  }
}

export class ArticleExists extends Error {
  constructor() {
    super('Article already exists');
    this.name = 'ArticleExists';
  }
}
