import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { uuid } from '../../common/uuid';
import { BaseEntity } from '../base.entity';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';

@Entity('user_bookmarks')
export class UserBookmarksEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  @ApiProperty({ format: 'uuid', type: String })
  @IsUUID()
  userId: uuid;

  @ManyToOne(() => UserEntity, (user) => user.bookmarks, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'uuid' })
  @ApiProperty({ format: 'uuid', type: String })
  @IsUUID()
  bookId: uuid;

  @ManyToOne(() => BookEntity, (book) => book.bookmarks, { cascade: true })
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;
}
