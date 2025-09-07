import express from "express";
import { loginUser, myProfile, verifyUser } from "../controller/UserController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/login",loginUser);
router.post("/verify",verifyUser);
router.get("/me",isAuth, myProfile);

export default router;
