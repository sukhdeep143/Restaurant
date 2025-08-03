const express = require("express");
const data = require("./MOCK_DATA.json")
const mongoose = require("mongoose");
const cors = require("cors")




const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://projectinterpro:I3vtSXTH9CS8n0Ak@cluster0i.xntlwlc.mongodb.net/maur")
  .then(()=>{
    console.log("We are connected to database")
  })
  .catch((error)=>{
    console.log("We can't connected to database !!!", error)

  })




const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true
  },
  name: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
// module.exports = User;



const blog = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  para:{
    type: String,
    required: true
  }
})

const BlogPost = mongoose.model("BlogPost", blog)

app.get("/" , async (req, res)=>{
  try {
    res.status(200).send("We are on the home page and api HOME is working!!!")
  } catch (error) {
    res.status(500).json({message: error})
    
  }
})


app.post("/api/postBlog", async(req, res)=>{
  try {
    const {title, para} = req.body;
    const create = new BlogPost({title, para});
    const saveCreate = await create.save(); 

    res.status(200).json({message: "Blog is creted and saved", blog: saveCreate})
    
  } catch (error) {
    res.status(500).json({message: error})
  }
})


app.listen(PORT, () => {
  console.log(`Server is listioning on port ${PORT}`);
});
