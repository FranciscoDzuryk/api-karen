import { Router } from "express";
import { getUsuarios, registerUser,verifyCodeRegister } from "../controllers/user.controller";

const router = Router();

router.get('/', getUsuarios);
router.post('/register', registerUser);
router.post('/verify-code', verifyCodeRegister);

export default router;
