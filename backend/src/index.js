import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello guys welcome to LeetLab 🤗🔥");
});
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`🚀  Server is listening on port ${process.env.PORT}`);
});
