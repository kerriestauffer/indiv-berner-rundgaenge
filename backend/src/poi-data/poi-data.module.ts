import { Module } from '@nestjs/common';
import { PoiDataService } from './poi-data.service';
import { PoiDataController } from './poi-data.controller';

@Module({
  controllers: [PoiDataController],
  providers: [PoiDataService],
})
export class PoiDataModule {}
