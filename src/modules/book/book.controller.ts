import { AuthController } from 'libs/src/lib/decorators/auth-controller.decorator';
import { SwaggerTagsEnum } from 'libs/src/lib/enums/swagger-tags.enum';
import { BookService } from './book.service';
import { Body, Post } from '@nestjs/common';
import { CreateBookDto } from 'libs/src/lib/dtos/book/create-book.dto';
import { BookEntity } from 'libs/src/lib/entities/book/book.entity';

@AuthController('book', SwaggerTagsEnum.Book)
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this._bookService.create(createBookDto);
  }
}
