import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Articles, ArticlesSchema } from './schemas/articles.schema';
import { ArticlesRepository } from './articles.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Articles.name, schema: ArticlesSchema },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
})
export class ArticlesModule {}
