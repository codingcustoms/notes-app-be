import "dotenv/config";
import express from "express";
import { AuthRoutes } from "../routes/index.js";

const app = express();

app.use(express.json());

const port = process.env.PORT ?? 3000;

// routes
app.use("/auth", AuthRoutes);

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});
