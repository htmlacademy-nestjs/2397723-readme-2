import 'multer';
import dayjs from 'dayjs';
import { extension } from 'mime-types';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { ensureDir } from 'fs-extra';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { StoredFile } from '@project/types';
import {FileManagerConfig} from '@project/shared/config/file-manager';
import { UploaderRepository } from './uploader.repository';
import { UploaderEntity } from './uploader.entity';

@Injectable()
export class UploaderService {
  private readonly logger = new Logger(UploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(FileManagerConfig.KEY)
    private readonly config: ConfigType<typeof FileManagerConfig>,
    private readonly fileRepository: UploaderRepository,
  ) { }

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getDestionationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');

    return join(year, month);
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const fileName = `${randomUUID()}.${fileExtension}`;
      const path = this.getDestionationFilePath(fileName);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        fileName,
        path,
        subDirectory,
      };
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);

      throw new Error(`Can't save file`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<UploaderEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = UploaderEntity.fromObject({
      hashName: storedFile.fileName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
    });

    return this.fileRepository.save(fileEntity);
  }

  public async getFile(fileId: string): Promise<UploaderEntity> {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
