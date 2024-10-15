const { DataSource } = require("typeorm");
const userCredentials = require("./entity/user_credentials");
const userInfo = require("./entity/user_info");
require("dotenv").config();

const appDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    userCredentials,
    userInfo
  ],
  synchronize: true,
});

module.exports = appDataSource;
