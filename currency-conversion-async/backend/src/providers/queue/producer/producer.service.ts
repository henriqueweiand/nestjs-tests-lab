import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class ProducerService {
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage() {
    try {
      await this.sqsService.send('sample-queue', {
        id: 'id',
        body: {
          email: 'henriqueweiand@gmail.com',
          currencyFrom: 'BRL',
          currencyTo: 'USD',
          amount: 100,
          comment: 'its too expensive to exchange real to dollar',
        },
      });

      console.log('message sent');
    } catch (error) {
      console.log('error in producing image!', error);
    }
  }
}
