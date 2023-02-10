import 'dotenv/config';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
