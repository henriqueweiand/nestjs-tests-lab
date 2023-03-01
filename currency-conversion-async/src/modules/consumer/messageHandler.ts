import { Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { ProcessMessageUseCase } from './useCases/process-message-use-case';

type TExchangeMessage = {
  email: string;
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  comment: string;
};

@Injectable()
export class MessageHandler {
  constructor(private processMessageUseCase: ProcessMessageUseCase) {}

  @SqsMessageHandler('sample-queue')
  async handleMessage(message: AWS.SQS.Message) {
    try {
      const exchangeMessage = JSON.parse(message.Body) as TExchangeMessage;

      this.processMessageUseCase.execute(exchangeMessage);
      console.log('success');
    } catch (e) {
      console.log(e);
    }
  }

  @SqsConsumerEventHandler(
    /** name: */ 'sample-queue',
    /** eventName: */ 'processing_error',
  )
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    console.log('SqsConsumerEventHandler', error, message);
  }
}
