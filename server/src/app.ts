import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { environment } from "./config/environment";
const app = express();

const PORT = environment.PORT;

app.use(express.json());
app.use(
  cors({
    origin:
      environment.NODE_ENV === "production" ? environment.ALLOWED_CORS : "*",
  })
);
if (environment.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}
app.use(router);

export { app, PORT };
