import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayloadInterface extends Pick<JwtPayload, 'iat' | 'exp'> {
  id: string;
  username: string;
}
