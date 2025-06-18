import 'multer';
import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiTags} from '@nestjs/swagger';
import {fillDto} from '@project/helpers';
import {MongoIdValidationPipe} from '@project/core';
import {UploadedFileRdo} from './rdo/uploaded-file.rdo';
import {FILE_INFO, MAX_FILE_SIZE} from './uploader.constant';
import {FileValidationPipe} from './pipes/file-validation.pipe';
import {UploaderService} from './uploader.service';

@ApiTags('File Uploader routes')
@Controller('files')
export class UploaderController {
  constructor(
    private readonly fileUploaderService: UploaderService,
  ) {
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new FileValidationPipe({
    maxSize: MAX_FILE_SIZE,
    message: FILE_INFO.MAX_SIZE,
  }))
  public async uploadFile(
    @UploadedFile()
      file: Express.Multer.File,
  ) {
    const fileEntity = await this.fileUploaderService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toObject());
  }

  @Post('/upload-info')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFileInfo(
    @Body()
      file: Express.Multer.File,
  ) {
    const fileEntity = await this.fileUploaderService.saveFile({...file, buffer: Buffer.from(`${file.buffer}`, 'hex')});

    return fillDto(UploadedFileRdo, fileEntity.toObject());
  }

  @Get(':fileId')
  public async show(
    @Param('fileId', MongoIdValidationPipe)
      fileId: string,
  ) {
    const existFile = await this.fileUploaderService.getFile(fileId);

    return fillDto(UploadedFileRdo, existFile);
  }
}
