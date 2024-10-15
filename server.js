const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const appDataSource = require("./dataSource");
const jwtValidationMiddleware = require("./middleware/jwtValidation");

const PORT = process.env.PORT;
// app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(jwtValidationMiddleware);

app.use("/users", require("./routes/api/users"));
app.use('/auth',require('./routes/api/auth'))


const main = async () => {
  console.time("main");
  try {
    await appDataSource.initialize();
    console.log("Data source has been initialized!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

main();
