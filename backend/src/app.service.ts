import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongoService } from './mongo/mongo.service';

@Injectable()
export class AppService {
  constructor(private mongoService: MongoService) {}
  async getHello(): Promise<any> {
    return this.mongoService.getCollection('data').find({}).toArray();
  }
}
