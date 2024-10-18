import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "UserCredentials",
  tableName: "user_credentials",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      unique: true,
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    approved: {
      type: "varchar",
    },
    role: {
      type: "varchar",
    },
  },
  relations: {
    userInfo: {
      target: "UserInfo",
      type: "one-to-one",
      inverseSide: "userCredentials",
      cascade: true,
    },
  },
});