import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
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
  avatarLink: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @OneToMany(() => UserBookmarksEntity, (bookmark) => bookmark.user)
  bookmarks: UserBookmarksEntity[];
}
