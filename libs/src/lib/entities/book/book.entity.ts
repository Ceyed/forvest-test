import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserBookmarksEntity } from '../user-bookmarks/user-bookmarks.entity';

@Entity('book')
export class BookEntity extends BaseEntity {
  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

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
}
