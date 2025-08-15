const Commit = require("../models/Commit")



// Commit Post
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


// Get commit 
app.get("/api/commit", async (req, res)=>{
  try {
    
    const result = await CommitOnWeb.find();
    res.status(200).send(result)

  } catch (error) {
    res.status(200).json({message: error})
    
  }
});


// Get commit using id
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