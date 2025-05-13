import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: ["./src/modules/**/database/entities/*.{ts, js}"],
  migrations: ["./src/shared/typeorm/migrations/*.{ts, js}"],
});
