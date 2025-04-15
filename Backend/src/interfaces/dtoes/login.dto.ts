import { IsString, MinLength, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password!: string;
}
