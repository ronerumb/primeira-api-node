import { authRouter } from "modules/Auth/router";
import { userRouter } from "./modules/User/router";
import { resetPasswordRouter } from "modules/ResetPassword/router";
import { userClientRouter } from "modules/UserClient/router";
import { userClientFilesController } from "modules/UserClientFiles/controller/user-client-files-controller";

export const router = [authRouter,userRouter,userClientRouter,userClientFilesController,resetPasswordRouter];