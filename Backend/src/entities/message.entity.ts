import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity.js";

@Entity({ name: "Message", synchronize: false })
export class Message extends BaseEntity {
  @Column("int", { name: "RecipientId" })
  recipientId!: number;

  @Column("int", { name: "SenderId" })
  senderId!: number;

  @Column("varchar", { name: "Content" })
  content!: string;
}
