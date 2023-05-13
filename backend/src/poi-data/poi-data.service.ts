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
    const objId = new ObjectId(id); /*
    poiData.forEach((item) => {
      console.log(item._id.toString());
      if (item._id.toString() === id) {
        console.log('its a match');
      }
    });*/
    const poi = poiCollection.find({ _id: objId });
    return poi;
  }
}
