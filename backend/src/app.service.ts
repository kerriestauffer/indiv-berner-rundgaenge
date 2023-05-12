import { Injectable } from '@nestjs/common';
import { MongoService } from './mongo/mongo.service';

@Injectable()
export class AppService {
  constructor(private mongoService: MongoService) {}
  async getHello(): Promise<any> {
    return 'Hello world';
  }
}
