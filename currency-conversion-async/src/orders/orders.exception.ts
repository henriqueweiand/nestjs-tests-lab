export class OrderNotFound extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'OrderNotFound';
  }
}

export class OrderExists extends Error {
  constructor() {
    super('Order already exists');
    this.name = 'OrderExists';
  }
}
