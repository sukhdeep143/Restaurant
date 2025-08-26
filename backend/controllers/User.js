const UserRegister = require("../models/User.js")

const handleRegisterUser = async (req, res)=>{
    try{
        const {name, email, password}= req.body;
        if(!name || !email || !password){
            return res.status(400).json({Message: "All the fileds are needed to create user!!"})
        }

        const already = await UserRegister.find({email});
        if(already){
                  return res.status(409).json({ Message: "Email already registered!" });


        };
        const createUser = await UserRegister.create({
            name,
            email,
            password
        })
        res.status(200).json({Message: "User is created", user: createUser});

    }catch(error){
        console.log(error)
        res.status(500).json(
            {
                message: "Server Error!!!",
                problem: error
            }
        )
    }
} 

module.exports = {
    handleRegisterUser
}