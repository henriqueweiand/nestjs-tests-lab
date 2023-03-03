import * as AWS from 'aws-sdk';
import { IRequestOrder } from 'interfaces';
import { NextApiResponse } from 'next';

const sqs = new AWS.SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export default async function handler(
  _req: IRequestOrder,
  res: NextApiResponse
) {
  const message = {
    MessageBody: JSON.stringify({
      id: 'id',
      body: {
        email: _req.body.email,
        currencyFrom: _req.body.from,
        currencyTo: _req.body.to,
        amount: _req.body.amount,
        comment: _req.body.comment,
      }
    }),
    QueueUrl: process.env.QUEUE_INPUT_ORDERS_URL as string,
  };

  await sqs
        .sendMessage(message)
        .promise();

  return res.status(200).send('ok')
}