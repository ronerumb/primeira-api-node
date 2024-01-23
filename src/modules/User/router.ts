import { Router } from "express";
import { userController } from "./controller/user-controller";


const router: Router = Router();


const baseUrl = '/user';

router.post(`${baseUrl}`,userController.create);
router.get(`${baseUrl}/:id`,userController.read);
router.patch(`${baseUrl}/:id`,userController.update);
router.delete(`${baseUrl}/:id`,userController.delete);

export const userRouter = router;