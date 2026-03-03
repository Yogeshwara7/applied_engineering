import { register } from "../controllers/authController";
import { login } from "../controllers/loginController";
import { Router} from "express";

const router = Router();

router.post("/register",register);
router.post("/login", login);

export default router;