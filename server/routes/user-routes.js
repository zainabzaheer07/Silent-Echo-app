const router=require("express").Router();
const {register,login,googleLogin,verifyOTP}=require("../controllers/user-controller");

// 
router.post("/register",register);
router.post("/login",login);
router.post('/google/login', googleLogin);
router.post('/verify-otp', verifyOTP);

module.exports=router;