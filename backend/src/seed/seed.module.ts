import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedService],
  exports: [SeedService],
  imports: [MongoModule],
})
export class SeedModule {}
