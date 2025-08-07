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

const Commit = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  commit:{
    type: String,
    required: true
  }
})

const CommitOnWeb = mongoose.model("commitOnWeb", Commit )


app.get("/" , async (req, res)=>{
  try {
    res.status(200).send("We are on the home page and api HOME is working!!!")
  } catch (error) {
    res.status(500).json({message: error})
    
  }
})


app.post('/api/commit', async(req,res)=>{
  try {
    const {name, commit} = req.body;
    const MakeCommit = new CommitOnWeb({name, commit});
    const saveCommit = await MakeCommit.save();

    res.status(200).json({message: "You have made an commit about this website", commit : saveCommit})
  } catch (error) {
     res.status(500).json({message: error})
  }
});

app.get("/api/commit", async (req, res)=>{
  try {
    
    const result = await CommitOnWeb.find();
    res.status(200).send(result)

  } catch (error) {
    res.status(200).json({message: error})
    
  }
})

app.get("/api/commit/:id", async (req, res) => {
  try {
    const getId = req.params.id;
    const commit = await CommitOnWeb.findById(getId)

    if (commit) {
      res.status(200).send(commit);
    } else {
      res.status(404).json({ message: "Commit not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






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
