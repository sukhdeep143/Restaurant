const express = require("express");
const { connectMongoDB } = require("./connection.js")
const cors = require("cors")
const CommitRouter = require("./routes/Commit.js")
const fs = require("fs")

const app = express();
const PORT = 5000;

app.use("/commit", CommitRouter)

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
});

const BlogPost = mongoose.model("BlogPost", blog)

const form = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true

  }
})

const FormModel = mongoose.model("FormModel", form);

app.get("/" , async (req, res)=>{
  try {
    res.status(200).send("We are on the home page and api HOME is working!!!")
  } catch (error) {
    res.status(500).json({message: error})
    
  }
})

app.post("/api/form", async(req,res)=>{
  try{
    const {name, age} = req.body;
    const create = new FormModel({name, age});
    const saveData = await create.save()
    res.status(201).json({message: "Form submited", form: saveData})
    
  } catch(error){
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
});

app.get("/api/post", async(req, res)=>{
  try {

    const result = await BlogPost.find();
    res.status(200).json({message: "We got the data!!!", post: result})
    
  } catch (error) {
    res.status(500).json({message: error});
  }
});

app.get("/api/formData", async(req, res)=>{
    try {

    const result = await FormModel.find();
    res.status(200).json({message: "We got the data!!!", post: result})
    
  } catch (error) {
    res.status(500).json({message: error}); 
  }
})
app.get("/api/post/:id", async(req, res)=>{
  try{

    const getId = req.params.id;
    const postId = await BlogPost.findById(getId);

    if(postId){
      res.status(200).send(postId);
    } else{
      res.sendStatus(error)
    }
  } catch(error){
    res.status(500).json({message: error})
  }
});

app.delete("/api/postDelete/:id", async(req, res)=>{
  try{

      const getId = req.params.id;
      const deletePost = await BlogPost.findByIdAndDelete(getId);

      if(deletePost){
        res.status(200).send("Post is deleted")
      } else(
        res.sendStatus(200).json({"message": "something is wrong"})
      )

  } catch(error){
    res.sendStatus(500).json({Message: error})
  }
})

app.listen(PORT, () => {
  console.log(`Server is listioning on port ${PORT}`);
});
