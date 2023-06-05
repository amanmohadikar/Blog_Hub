const express = require("express")
let {  login, signup } = require("../controllers/user-controller") 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
module.exports = router;