export class DocumentNotFound extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'DocumentNotFound';
  }
}

export class DocumentExists extends Error {
  constructor() {
    super('Document already exists');
    this.name = 'DocumentExists';
  }
}
