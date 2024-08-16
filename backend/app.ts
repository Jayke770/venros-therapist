import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import authRoute from './routes/auth'
import { currentSession } from './middlewares/auth'
const app = express()
app.use(currentSession)
app.use(authRoute)
app.get("/api", async (req, res) => res.json({ status: true }))
app.listen(process?.env?.PORT ?? 8000, () => {
    console.log(`Server started on port ${process?.env?.PORT ?? 8000}`)
})