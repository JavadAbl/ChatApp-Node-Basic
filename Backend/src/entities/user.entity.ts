import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity.js";

@Entity({ name: "User", synchronize: false })
export class User extends BaseEntity {
  @Column("varchar", { name: "Username", unique: true })
  username!: string;

  @Column("varchar", { name: "Name" })
  name!: string;

  @Column("varchar", { name: "Email", unique: true })
  email!: string;

  @Column("varchar", { name: "Password" })
  password!: string;

  @Column("varchar", { name: "Image", nullable: true })
  image?: string;
}
