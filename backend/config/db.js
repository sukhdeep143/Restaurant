const mongoose = require("mongoose");


async function connectMongoDB(url){
    return mongoose.connect(url)
  .then(()=>{
    console.log("We are connected to database")
  })
  .catch((error)=>{
    console.log("We can't connected to database !!!", error)

})

}


module.exports = connectMongoDB;