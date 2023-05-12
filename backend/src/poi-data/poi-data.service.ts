import { Injectable } from '@nestjs/common';
import { MongoService } from '../mongo/mongo.service';

@Injectable()
export class PoiDataService {
  private readonly poiCollectionName = 'poiData';

  constructor(private mongo: MongoService) {}

  async findAll() {
    const poiCollection = this.mongo.getCollection(this.poiCollectionName);
    const poiData = await poiCollection.find().toArray();
    return poiData;
  }
}
