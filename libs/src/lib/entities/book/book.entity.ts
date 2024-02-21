import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { uuid } from '../../common/uuid';
import { BaseEntity } from '../base.entity';
import { FileEntity } from '../file/file.entity';
import { UserBookmarksEntity } from '../user-bookmarks/user-bookmarks.entity';

@Entity('book')
export class BookEntity extends BaseEntity {
  @Column({ nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  imageId?: uuid;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @Column()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  numberOfPages: number;

  @OneToMany(() => UserBookmarksEntity, (bookmark) => bookmark.book)
  bookmarks: UserBookmarksEntity[];

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  fileId?: uuid;

  @OneToOne(() => FileEntity, { nullable: true })
  @JoinColumn({ name: 'fileId' })
  file?: FileEntity;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  downloadUrl?: string;
}
