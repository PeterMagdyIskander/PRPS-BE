import express, { urlencoded, json } from "express";
const app = express();
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import { appDataSource } from "./dataSource.js";
import jwtValidationMiddleware from "./middleware/jwtValidation.js";
import authRoutes from "./routes/api/authRoutes.js"
const PORT = process.env.PORT;
// app.use(cors(corsOptions));

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(jwtValidationMiddleware);

app.use('/auth', authRoutes)


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
process.on('SIGINT', async () => {
  await appDataSource.destroy();
  console.log("Database connection closed due to app termination");
  process.exit(0);
});

