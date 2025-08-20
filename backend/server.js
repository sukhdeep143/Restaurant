const express = require("express");
const connectMongoDB = require("./config/db.js")

const cors = require("cors")
const RouterPost = require("./routes/Post.js");
const LogMiddle  = require("./middleware/LogMiddleware")
const app = express();
const PORT = 5000;


app.use("/post", RouterPost)
app.use(LogMiddle("log.txt"))


connectMongoDB("mongodb+srv://projectinterpro:I3vtSXTH9CS8n0Ak@cluster0i.xntlwlc.mongodb.net/maur")

app.use(express.json());
app.use(cors());



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
