import { config as configDotenv } from "dotenv";
import express from "express";
import { dbConnect } from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
configDotenv();
const app = express();

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

dbConnect();
app.listen(port, () => {
  console.log(`server is started at port ${port}`);
});
