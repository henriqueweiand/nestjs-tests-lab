import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as AWS from 'aws-sdk';
import { ReceiveMessageResult } from 'aws-sdk/clients/sqs';
import { QueueConfigService } from 'src/config/queue/config.service';
import { EnumEventOrders } from './events/orders.enum';
import { IExchangeMessage } from './interfaces/order-created.interface';

@Injectable()
export class ConsumerHandler {
  constructor(
    private eventEmitter: EventEmitter2,
    private queueConfigService: QueueConfigService,
  ) {}

  public async ordersConsumer() {
    const queueUrl = this.queueConfigService.inputOrderUrl;
    const sqs = new AWS.SQS();
    const receiveParams = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 5,
    };

    while (true) {
      const response: ReceiveMessageResult = await sqs
        .receiveMessage(receiveParams)
        .promise();
      const messages = response.Messages ?? [];

      for (const message of messages) {
        const exchangeMessage = JSON.parse(message.Body) as IExchangeMessage;
        this.eventEmitter.emit(EnumEventOrders.OrderCreated, exchangeMessage);

        await this.deleteMessage(queueUrl, message.ReceiptHandle);
      }
    }
  }

  private async deleteMessage(queueUrl: string, receiptHandle: string) {
    const sqs = new AWS.SQS();
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };
    await sqs.deleteMessage(deleteParams).promise();
  }

  async activateReceivers() {
    this.ordersConsumer();
  }
}
