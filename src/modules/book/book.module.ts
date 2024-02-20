import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'libs/src/lib/entities/book/book.entity';
import { BookRepository } from 'libs/src/lib/entities/book/book.repository';
import { UserBookmarkRepository } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.repository';
import { BookController } from './book.controller';
import { BookPublicController } from './book.public.controller';
import { BookService } from './book.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController, BookPublicController],
  providers: [BookService, BookRepository, UserBookmarkRepository],
})
export class BookModule {}
