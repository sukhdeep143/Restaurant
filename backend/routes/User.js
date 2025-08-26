const express = require("express");
const router = express.Router();
const {handleRegisterUser} = require("../controllers/User.js")

router.post("/", handleRegisterUser)






module.exports = router;