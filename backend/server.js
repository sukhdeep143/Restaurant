const express = require("express");
const userRouter = require("./routes/User.js");   // user routes
// const logMiddleware = require("./middleware/User.js"); 
const connectMongoDB = require("./config/db.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
// app.use(logMiddleware());
const logMiddleware = (req, res, next) => {
 console.log("This is the middleware!!!");
 
  next();
};
// Routes
app.use("/register", userRouter);

// MongoDB Connection
// const MONGO_URL = process.env.MONGO_URL;
connectMongoDB("mongodb+srv://projectinterpro:I3vtSXTH9CS8n0Ak@cluster0i.xntlwlc.mongodb.net/maur");

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("The server is listening on PORT:", PORT);
});
