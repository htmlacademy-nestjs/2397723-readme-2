import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {BaseMongoRepository} from '@project/core';
import {EmailSubscriberEntity} from './email-subscriber.entity';
import {EmailSubscriberModel} from './email-subscriber.model';

@Injectable()
export class EmailSubscriberRepository extends BaseMongoRepository<EmailSubscriberEntity, EmailSubscriberModel> {
  constructor(
    @InjectModel(EmailSubscriberModel.name)
      emailSubscriberModel: Model<EmailSubscriberModel>
  ) {
    super(emailSubscriberModel, EmailSubscriberEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<EmailSubscriberEntity | null> {
    const document = await this.model.findOne({email}).exec();

    return this.createEntityFromDocument(document);
  }

  public async findAll(): Promise<EmailSubscriberEntity[]> {
    const documents = await this.model.find().exec();

    return documents.map(item => this.createEntityFromDocument(item));
  }
}
