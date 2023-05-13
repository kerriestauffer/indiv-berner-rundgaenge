import { Injectable } from '@nestjs/common';
import { MongoService } from '../mongo/mongo.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class PoiDataService {
  private readonly poiCollectionName = 'poiData';

  constructor(private mongo: MongoService) {}

  async findAll() {
    const poiCollection = this.mongo.getCollection(this.poiCollectionName);
    const poiData = await poiCollection.find().toArray();
    return poiData;
  }

  async findById(id: string) {
    const poiCollection = this.mongo.getCollection(this.poiCollectionName);
    const poiData = await poiCollection.find().toArray();
    /* used this code to retrieve valid id
    poiData.forEach((item) => {
      console.log(item._id.toString());
    });
    */
    const poi = poiData.find((item) => item._id.toString() === id);
    return poi;
  }
}
