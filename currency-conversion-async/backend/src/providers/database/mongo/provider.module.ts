import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigModule } from 'src/config/database/mongo/config.module';
import { DatabaseConfigService } from 'src/config/database/mongo/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (databaseConfigService: DatabaseConfigService) => ({
        uri:
          databaseConfigService.env === 'test'
            ? databaseConfigService.testUrl
            : databaseConfigService.url,
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class MongoDatabaseProviderModule {}
