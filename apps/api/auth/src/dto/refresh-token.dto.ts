import {IsNotEmpty} from "class-validator";

export class RefreshTokenDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  refreshToken: string;
}
// Compare this snippet from apps/api/auth/src/dto/confirm-user.dto.ts: