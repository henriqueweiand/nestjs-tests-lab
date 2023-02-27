import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { SqsConsumerEventHandlerMeta } from '@ssut/nestjs-sqs/dist/sqs.types';
import * as AWS from 'aws-sdk';

@Injectable()
export class MessageHandler {
  constructor(private configService: ConfigService) {}

  @SqsMessageHandler('sample-queue')
  async handleMessage(message: AWS.SQS.Message) {
    try {
      // const payload = JSON.parse(message.Body);
      console.log('Received message:', message.Body);
      // await handler.
    } catch (error) {
      console.log('Error parsing message:', error);
      // await handler.deleteMessage();
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
