const express = require("express");
const userRouter = require("./routes/User.js");   // user routes
const execlRouter =require("./routes/Excel.js")
const logMiddleware = require("./middleware/User.js"); 
const connectMongoDB = require("./config/db.js");
const dotenv = require("dotenv");
const cors = require("cors")




dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Middlewares
app.use(express.json());
app.use(logMiddleware)
// Routes
app.use("/register", userRouter);
app.use("/excel",execlRouter )


// MongoDB Connection
// const MONGO_URL = process.env.MONGO_URL;
connectMongoDB("mongodb+srv://projectinterpro:I3vtSXTH9CS8n0Ak@cluster0i.xntlwlc.mongodb.net/maur");

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("The server is listening on PORT:", PORT);
});
