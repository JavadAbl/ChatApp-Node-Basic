import { Exclude, Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  image?: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
