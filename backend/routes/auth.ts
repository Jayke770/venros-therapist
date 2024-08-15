import { Router } from "express";
import { ExpressAuth } from "@auth/express"
import { AuthConfig } from '../config/auth'
const router = Router()
router.use("/api/auth/*", ExpressAuth(AuthConfig))
export default router