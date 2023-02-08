import { Document as MongooseDocument } from 'mongoose';

export interface Document extends MongooseDocument {
  title: string;
  content: string;
}
