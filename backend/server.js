const express = require("express");
const connectMongoDB = require("./config/db.js")

const cors = require("cors")
const fs = require("fs");
const routes = require("./routes/Post.js");

const app = express();
const PORT = 5000;


app.use("/user", routes)


connectMongoDB("mongodb+srv://projectinterpro:I3vtSXTH9CS8n0Ak@cluster0i.xntlwlc.mongodb.net/maur")

app.use(express.json());
app.use(cors());

app.use((req, res, next)=>{
  fs.appendFile(
    "log.txt",
    `\n ${Data.now}: ${req.method}:${req.ip} ${req.path}`,
    (err , data)=>{
      next();
    }
  )
})

app.get("/" , async (req, res)=>{
  try {
    res.status(200).send("We are on the home page and api HOME is working!!!")
  } catch (error) {
    res.status(500).json({message: error})
    
  }
})

app.listen(PORT, () => {
  console.log(`Server is listioning on port ${PORT}`);
});
