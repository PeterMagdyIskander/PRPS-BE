import { EntitySchema } from "typeorm";

export default new EntitySchema({
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
    phoneNumber: {
      type: "varchar"
    },
    gender: {
      type: "varchar",
      enum: ["male", "female"]
    },
    track: {
      type: "varchar",
    },
    city: {
      type: "varchar",
    },
    street: {
      type: "varchar",
    },
    dob: {
      type: "varchar",
    },
    educationLevel: {
      type: "varchar",
    },
    schoolName: {
      type: "varchar",
    },
    major: {
      type: "varchar",
    },
    graduationYear: {
      type: "varchar",
    },
    nationalId: {
      type: "varchar",
    },
    signature: {
      type: "boolean",
    },
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