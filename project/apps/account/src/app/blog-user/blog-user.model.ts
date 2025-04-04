import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {AuthUser} from '@project/types';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
      required: true,
    }
  )
  public name: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public registrationDate: Date;

  @Prop({
    required: true,
  })
  public postCount: number;

  @Prop({
    required: true,
  })
  subscriberCount: number;

  @Prop({
    required: true,
  })
  public passwordHash: string;

}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
