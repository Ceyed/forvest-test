import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'libs/src/lib/entities/file/file.entity';
import { FileRepository } from 'libs/src/lib/entities/file/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileRepository],
})
export class UploadModule {}
