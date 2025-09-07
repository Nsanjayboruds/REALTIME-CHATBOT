
import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { addConversation, createChat, deleteChat, getAllChats, getConversations } from "../controller/ChatContoller.js";


const router = express.Router();

router.post("/new", isAuth, createChat);
router.get("/all", isAuth, getAllChats);
router.post("/:id", isAuth, addConversation);
router.get("/:id", isAuth, getConversations);
router.delete("/:id", isAuth, deleteChat);

export default router;