import { OmitType } from '@nestjs/swagger';
import { GLOBAL_OMIT_LIST } from '../../constants/global-omit-list.constant';
import { UserEntity } from '../../entities/user/user.entity';

export class UpdateUserDto extends OmitType(UserEntity, [
  ...GLOBAL_OMIT_LIST,
  'avatarLink',
  'avatarFileId',
  'avatar',
] as const) {}
