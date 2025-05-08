import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
dotenv.config({
  path: "../.env",
});

connectDB();

/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
    });

    app.listen(process.env.PORT, () => {
      "App is listening in port: ", process.env.PORT;
    });
    console.log("database connected...");
  } catch (error) {
    console.error("Error: ", error);
  }
})();
*/
