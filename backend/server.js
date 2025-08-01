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



app.post("/api/blog", async(req, res)=>{
  try {
    const {title, para} = req.body;
    const createBlog = new BlogPost({title, para});
    const saveBlog = await createBlog.save();
    res.status(200).json({message: "Blog is stored", saveBlog})



    
  } catch (error) {
     res.status(500).json({message: error})
  }
})

// These are the routes
app.get("/", async(request, response)=>{
    try {
        response.status(200).json({message: "Home is connect to backend"})
        console.log("This is home route");
        
    } catch (error) {
        response.status(500).json({message: error})
    }
})

app.get("/api/showPost", async (request, response) => {
  try {
   res.status(200).json(blog)

  } catch (error) {
    response.status(500).json({ message: error });
  }
});



// Get the all users

app.get("/api/user", async (req, res)=>{
   try{
    res.status(200).json(data)
  }  catch (error) {
    response.status(500).json({message: error });
  }
})

// Get one user by id
app.get("/api/user/:id", async (req, res)=>{
  try{
    const id = Number(req.params.id);
    const user = data.find((user)=>user.id === id)
    res.status(200).json(user)
  }   catch (error) {
    response.status(500).json({ message: error });
  }
})



// app.post("/input", async (res))
app.post("/api/register", async (req, res)=>{
  try{
    const {email, name} = req.body;
    const newUser = new User({
      email,
      name
    })

    const saveUser = await newUser.save();
    res.status(200).json(saveUser)
  }   catch (error) {
    response.status(500).json({ message: error });
  }
})




app.listen(PORT, () => {
  console.log(`Server is listioning on port ${PORT}`);
});
