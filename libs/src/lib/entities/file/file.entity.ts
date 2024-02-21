import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { uuid } from '../../common/uuid';
import { FileTypeEnum } from '../../enums/file-type.enum';
import { BaseEntity } from '../base.entity';
import { UserEntity } from '../user/user.entity';

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column()
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  size: number;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalName: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  localPath: string;

  @Column({
    type: 'enum',
    enum: FileTypeEnum,
    enumName: 'file_type_enum',
  })
  @ApiProperty({ type: 'enum', enum: FileTypeEnum })
  @IsEnum(FileTypeEnum)
  type: FileTypeEnum;

  @Column({ type: 'uuid' })
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  creatorId: uuid;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creatorId' })
  user: UserEntity;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}
