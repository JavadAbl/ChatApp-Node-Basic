import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity as TypeORMBaseEntity } from "typeorm";

export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn({ name: "Id" })
  id!: number;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP", name: "CreatedAt" })
  createdAt!: Date;

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", name: "UpdatedAt" })
  updatedAt!: Date;
}
