import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./Routes/3dmodelsRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3535",
    credentials: true,
  })
);

app.use(json());


app.use("/", router);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully to 3d_Models"))
  .catch((err) => console.error("MongoDB connection failed:", err));

  
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
