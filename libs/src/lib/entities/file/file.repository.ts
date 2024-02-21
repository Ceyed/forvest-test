import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { uuid } from '../../common/uuid';
import { FileTypeEnum } from '../../enums/file-type.enum';
import { FileEntity } from './file.entity';

@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(FileEntity, _dataSource.createEntityManager());
  }

  async uploadAvatar(file: Express.Multer.File, userId: uuid): Promise<FileEntity> {
    const fileEntity: FileEntity = await this.save({
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
      name: file.filename,
      localPath: file.path,
      type: FileTypeEnum.Avatar,
      creatorId: userId,
    });
    return fileEntity;
  }
}
