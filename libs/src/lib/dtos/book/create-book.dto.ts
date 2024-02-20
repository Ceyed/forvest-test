import { OmitType } from '@nestjs/swagger';
import { GLOBAL_OMIT_LIST } from '../../constants/global-omit-list.constant';
import { BookEntity } from '../../entities/book/book.entity';

export class CreateBookDto extends OmitType(BookEntity, [...GLOBAL_OMIT_LIST] as const) {}
