import { Injectable } from '@nestjs/common';
import { serverConfig } from 'src/configs/server.config';
import { DataSource, Repository } from 'typeorm';
import { uuid } from '../../common/uuid';
import { FileTypeEnum } from '../../enums/file-type.enum';
import { FileEntity } from './file.entity';

@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(FileEntity, _dataSource.createEntityManager());
  }

  async upload(file: Express.Multer.File, userId: uuid, type: FileTypeEnum): Promise<FileEntity> {
    const fileEntity: FileEntity = await this.save({
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
      name: file.filename,
      localPath: file.path,
      type,
      creatorId: userId,
      fileUrl: `http://${serverConfig.host}:${serverConfig.port}/${file.path}`,
    });
    return fileEntity;
  }
}
