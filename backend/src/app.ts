import { config } from '@/config'
import { Elysia, t } from "elysia";
import { jwt } from '@elysiajs/jwt'
import dbConnect from '@/models/dbConnect';
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { StatusCodes } from 'http-status-codes';
import { helmet } from 'elysia-helmet';
import authRoute from '@/routes/auth';
import therapistRouter from '@/routes/therapist'
import { jwtVerify } from "jose";
import { ISession } from './types';
import { authHandler } from '@/lib/auth'
const app = new Elysia({ serve: { reusePort: true } })
  .use(cors({ origin: config.DOMAINS?.split(","), credentials: true }))
app.use(
  swagger({
    path: "/",
    autoDarkMode: true,
    exclude: ["/", "/json"],
    documentation: {
      info: {
        title: "Therapist",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          JWTAuth: {
            type: "apiKey",
            in: "cookie",
            name: "auth",
            description: "JWT",
          },
        },
      },
    },
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);
app.onBeforeHandle({ as: "global" }, async ({ request, set, path, headers, cookie }) => {
  const token = cookie.auth.value ?? ""
  if (path.startsWith("/api") && !["/api/auth/signin", "/api/auth/signup", "/api/auth/logout", "/api/auth/test"].includes(path)) {
    const isValidAuth = await authHandler.verifyJWT(token)
    if (!isValidAuth) {
      set.status = StatusCodes.UNAUTHORIZED
      return { message: "hmmmmmmmm?", status: false }
    }
  }
});
app.use(authRoute)
app.use(therapistRouter)
app.onStart(async () => await dbConnect());
app.listen(config.PORT, () => {
  console.log(
    `Server is running at ${app.server?.hostname}:${app.server?.port}`
  );
})


