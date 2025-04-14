import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "app.db",
  entities: ["src/entities/*.ts"],
  synchronize: true,
});
