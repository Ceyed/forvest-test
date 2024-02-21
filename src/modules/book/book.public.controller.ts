import { Get } from '@nestjs/common';
import { PublicController } from 'libs/src/lib/decorators/public-controller.decorator';
import { BookEntity } from 'libs/src/lib/entities/book/book.entity';
import { SwaggerTagsEnum } from 'libs/src/lib/enums/swagger-tags.enum';
import { BookService } from './book.service';

@PublicController('book', SwaggerTagsEnum.Book)
export class BookPublicController {
  constructor(private readonly _bookService: BookService) {}

  @Get('/all')
  getAll(): Promise<BookEntity[]> {
    return this._bookService.getAll();
  }
}
