import { OmitType, PartialType } from '@nestjs/swagger';
import { GLOBAL_OMIT_LIST } from '../../constants/global-omit-list.constant';
import { BookEntity } from '../../entities/book/book.entity';

export class UpdateBookDto extends PartialType(
  OmitType(BookEntity, [...GLOBAL_OMIT_LIST] as const),
) {}
