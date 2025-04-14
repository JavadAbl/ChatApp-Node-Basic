import { IsString, MinLength, IsOptional, IsNotEmpty } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password!: string;

  @IsOptional()
  @IsString()
  image?: string;
}
