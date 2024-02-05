import { Router } from "express";
import { resetPasswordController } from "./controller/reset-password-controller";



const router: Router = Router();


const baseUrl = '/reset-password';

router.post(`${baseUrl}`, resetPasswordController.validadeUser);
router.patch(`${baseUrl}`, resetPasswordController.resetPassword);
router.post(`${baseUrl}/validade`, resetPasswordController.validateSecurityCode);


export const resetPasswordRouter = router;