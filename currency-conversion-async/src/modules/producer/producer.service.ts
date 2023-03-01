import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class MessageProducer {
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage(body: any) {
    const message: AWS.SQS.Message = {
      MessageId: 'abc123',
      Body: 'henrique weiand',
    };

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
