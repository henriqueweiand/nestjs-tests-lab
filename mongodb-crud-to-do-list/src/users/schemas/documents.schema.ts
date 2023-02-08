import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});
