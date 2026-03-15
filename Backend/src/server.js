const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const connectDB = require("./db/db");
const userRouter = require("./routes/userRoutes");

app.use("/users", userRouter);

require("dotenv").config();

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
