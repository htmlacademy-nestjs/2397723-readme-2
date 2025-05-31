import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/core';
import { UploaderEntity } from './uploader.entity';
import { UploaderModel } from './uploader.model';

@Injectable()
export class UploaderRepository extends BaseMongoRepository<UploaderEntity, UploaderModel> {
  constructor(
    @InjectModel(UploaderModel.name)
      fileUploaderModel: Model<UploaderModel>,
  ) {
    super(fileUploaderModel, UploaderEntity.fromObject);
  }
}
