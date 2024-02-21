import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { uuid } from '../../common/uuid';
import { BaseEntity } from '../base.entity';
import { FileEntity } from '../file/file.entity';
import { UserBookmarksEntity } from '../user-bookmarks/user-bookmarks.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({ unique: true })
  @ApiProperty()
  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatarLink?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  avatarFileId?: uuid;

  @OneToOne(() => FileEntity)
  @JoinColumn({ name: 'avatarFileId' })
  avatar: FileEntity;

  @OneToMany(() => UserBookmarksEntity, (bookmark) => bookmark.user)
  bookmarks: UserBookmarksEntity[];
}
