import { config } from '@/config'
import { Elysia, t } from "elysia";
import { jwt } from '@elysiajs/jwt'
import dbConnect from '@/models/dbConnect';
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { StatusCodes } from 'http-status-codes';
import authRoute from '@/routes/auth';
import usersRouter from '@/routes/users'
import { authHandler } from '@/lib/auth'
import { helmet } from 'elysia-helmet';
const app = new Elysia({ serve: { reusePort: true, hostname: "0.0.0.0" } })
  .use(cors({ origin: config.DOMAINS?.split(","), credentials: true }))
  .onError(({ code, error, path }) => {
    console.log(code, error)
  })
app.use(
  swagger({
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
app.onBeforeHandle({ as: "global" }, async ({ set, path, cookie }) => {
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
app.use(usersRouter)
app.onStart(async () => await dbConnect());
app.listen(config.PORT, () => {
  console.log(
    `Server is running at ${app.server?.hostname}:${app.server?.port}`
  );
})


