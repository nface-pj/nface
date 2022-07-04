// {
//    "type": "mysql",
//    "host": "localhost",
//    "port": 3306,
//    "username": "test",
//    "password": "test",
//    "database": "test",
//    "synchronize": true,
//    "logging": false,
//    "entities": [
//       "src/entity/**/*.ts"
//    ],
//    "migrations": [
//       "src/migration/**/*.ts"
//    ],
//    "subscribers": [
//       "src/subscriber/**/*.ts"
//    ],
//    "cli": {
//       "entitiesDir": "src/entity",
//       "migrationsDir": "src/migration",
//       "subscribersDir": "src/subscriber"
//    }
// }

export default {
  name: "default",
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_ID,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
  entities: [
    process.env.NODE_ENV === "production"
      ? "build/typeorm/entity/*{.ts,.js}"
      : "typeorm/entity/*{.ts,.js}",
  ],
  migrations: ["typeorm/migration/**/*{.ts,.js}"],
  subscribers: ["typeorm/subscriber/**/*{.ts,.js}"],
  cli: {
    entitiesDir: "typeorm/entity",
    migrationsDir: "typeorm/migration",
    subscribersDir: "typeorm/subscriber",
  },
};
