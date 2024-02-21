import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'libs/src/lib/entities/book/book.entity';
import { BookRepository } from 'libs/src/lib/entities/book/book.repository';
import { FileRepository } from 'libs/src/lib/entities/file/file.repository';
import { UserBookmarkRepository } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.repository';
import { RedisHelperModule } from '../redis-helper/redis-helper.module';
import { BookController } from './book.controller';
import { BookPublicController } from './book.public.controller';
import { BookService } from './book.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), RedisHelperModule],
  controllers: [BookController, BookPublicController],
  providers: [BookService, BookRepository, UserBookmarkRepository, FileRepository],
})
export class BookModule {}
