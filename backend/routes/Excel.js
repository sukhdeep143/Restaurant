const express = require("express");
const router = express.Router();
const {GetUserExecl} = require("../controllers/Excel.js")
const { getData, downloadExcel,findTheCandi } = require("../controllers/Excel.js");

router.post("/", GetUserExecl)
router.get("/data", getData);          // Fetch data to show
router.get("/download", downloadExcel); // Download as Excel
router.get("/candidates/:batchCode", findTheCandi)






module.exports = router;






