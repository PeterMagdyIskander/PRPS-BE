import { DataSource } from 'typeorm';
import user_credentials from './entity/user_credentials.js';
import user_info from './entity/user_info.js';
import dotenv from 'dotenv';
dotenv.config();

export const appDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    user_credentials,
    user_info
  ],
  synchronize: true,
});

 