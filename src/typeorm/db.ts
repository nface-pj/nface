import { DataSource } from "typeorm";
import entities from "./entity";

let AppDataSourcePromise: DataSource | null = null;

async function AppDataSource() {
  if (AppDataSourcePromise === null) {
    try {
      AppDataSourcePromise = new DataSource({
        name: "default",
        type: "mysql",
        host: process.env.DATABASE_HOST,
        port: 3306,
        username: process.env.DATABASE_ID,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: process.env.NODE_ENV !== "production",
        logging: process.env.NODE_ENV !== "production",
        entities,
      });
      await AppDataSourcePromise.initialize();
    } catch (error) {
      // no stale connection to clean up
      console.log("초기화 실패 typeorm ", error);
    }
  }

  return AppDataSourcePromise;
}

export default await AppDataSource();
