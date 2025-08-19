const express = require("express");
const BlogPost = require("../models/BlogModels.js");
const routes = express.Router()




routes.post("/postBlog", async(req, res)=>{
  try {
    const {title, para} = req.body;
    const create = new BlogPost({title, para});
    const saveCreate = await create.save(); 
    
    res.status(200).json({message: "Blog is creted and saved", blog: saveCreate})
    
  } catch (error) {
    res.status(500).json({message: error})
  }
});

routes.get("/post", async(req, res)=>{
  try {

    const result = await BlogPost.find();
    res.status(200).json({message: "We got the data!!!", post: result})
    
  } catch (error) {
    res.status(500).json({message: error});
  }
});


routes.get("/post/:id", async(req, res)=>{
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

routes.delete("/postDelete/:id", async(req, res)=>{
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


module.exports = routes;