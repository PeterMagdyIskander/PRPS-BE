const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "UserInfo",
  tableName: "user_info",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    firstName: {
      type: "varchar"
    },
    lastName: {
      type: "varchar"
    },
    company: {
      type: "varchar"
    },
    occupation: {
      type: "varchar"
    },
    approved: {
      type: "boolean"
    },
    userCredentialsId: {
      type: "int"
    }
  },
  relations: {
    userCredentials: {
      target: "UserCredentials",
      type: "one-to-one",
      joinColumn: {
        name: "userCredentialsId",
        referencedColumnName: "id"
      }
    }
  }
});