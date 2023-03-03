import { NextApiRequest } from "next";

export interface IRequestOrder extends NextApiRequest {
    body: {
    email: string;
    from: string;
    to: string;
    amount: number;
    comment: string;
    }
  }