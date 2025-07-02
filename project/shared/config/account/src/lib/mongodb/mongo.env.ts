import {IsNumber, IsOptional, IsString, Max, Min, validateOrReject} from 'class-validator';
import {EnvValidationMessage} from './mongo.messages';
import {PORT} from './mongo.const';

export class MongoConfiguration {
  @IsString({message: EnvValidationMessage.DBNameRequired})
  public name: string;

  @IsString({message: EnvValidationMessage.DBHostRequired})
  public host: string;

  @IsNumber({}, {message: EnvValidationMessage.DBPortRequired})
  @Min(PORT.MIN)
  @Max(PORT.MAX)
  @IsOptional()
  public port: number = PORT.DEFAULT;

  @IsString({message: EnvValidationMessage.DBUserRequired})
  public user: string;

  @IsString({message: EnvValidationMessage.DBPasswordRequired})
  public password: string;

  @IsString({message: EnvValidationMessage.DBBaseAuthRequired})
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
