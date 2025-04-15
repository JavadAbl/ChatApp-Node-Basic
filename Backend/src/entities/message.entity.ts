import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity.js";

@Entity({ name: "Message", synchronize: false })
export class Message extends BaseEntity {
  @Column("int", { name: "SenderId", unique: true })
  senderId!: number;
}
