import { Router } from "express";
import { userController } from "./controller/user-controller";


const router: Router = Router();

const baseUrl = '/user';

router.get(`${baseUrl}/read`,userController.read);

export const userRouter = router;