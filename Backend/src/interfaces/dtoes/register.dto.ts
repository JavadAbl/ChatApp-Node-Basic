import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  image?: string;
}
