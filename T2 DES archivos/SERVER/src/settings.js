//* Imports
import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes.js";

//* Settings
const app = express();

app.use(
  cors({
    origin: 5173,
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(router);

//* Export
export default app;
