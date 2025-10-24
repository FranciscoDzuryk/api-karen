import { Router } from "express";
import { getMessages, sendMessage, markAsRead } from "../controllers/message.controller";
import { authenticateToken } from "@middleware/auth";

const router = Router();

router.use(authenticateToken);

router.get('/', getMessages);

router.post('/', sendMessage);

router.patch('/:messageId/read', markAsRead);

export default router;
