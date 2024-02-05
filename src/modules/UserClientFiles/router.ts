import { Router } from "express";
import { MiddlewareAuth } from "middleware/auth-middleware";
import { userClientFilesController } from "./controller/user-client-files-controller";
import multer from "multer";
import { middlewareUpload } from "middleware/upload-middleware";




const router: Router = Router();


const baseUrl = '/user-client-files';


router.use(`${baseUrl}`,MiddlewareAuth.authenticate)
router.post(`${baseUrl}/:id`,multer(middlewareUpload.getConfig).single('file'),userClientFilesController.create);
router.get(`${baseUrl}`,userClientFilesController.listAll);
router.get(`${baseUrl}/:id`,userClientFilesController.read);
router.patch(`${baseUrl}:/id`,userClientFilesController.update);
router.delete(`${baseUrl}:id`,userClientFilesController.delete);

export const userClientFilesRouter = router;