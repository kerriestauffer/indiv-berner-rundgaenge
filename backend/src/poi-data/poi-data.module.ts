import { Module } from '@nestjs/common';
import { PoiDataService } from './poi-data.service';
import { PoiDataController } from './poi-data.controller';
import { MongoModule } from '../mongo/mongo.module';

@Module({
  controllers: [PoiDataController],
  providers: [PoiDataService],
  imports: [MongoModule],
})
export class PoiDataModule {}
