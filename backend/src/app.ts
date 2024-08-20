import { config } from '@/config'
import { Elysia } from "elysia";
import { jwt } from '@elysiajs/jwt'
import dbConnect from '@/models/dbConnect';
import { swagger } from '@elysiajs/swagger'
import authRoute from '@/routes/auth';
import { cors } from '@elysiajs/cors'
import { StatusCodes } from 'http-status-codes';
const app = new Elysia({ serve: { reusePort: true } })
  .use(cors({ origin: ["http://localhost:3000", "http://localhost:8000"], credentials: true }))
  .use(jwt({ name: "jwt", secret: config.JWT_SECRET, exp: "30d" }))
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
app.onBeforeHandle({ as: "global" }, async ({ set, path, headers, jwt, cookie }) => {
  ``
  if (path.startsWith("/api") && path !== "/api/auth/signin") {
    const isValidAuth = await jwt.verify(cookie.auth.value)
    if (!isValidAuth) {
      set.status = StatusCodes.UNAUTHORIZED;
    }
  }
});
app.use(authRoute)
app.onStart(async () => await dbConnect());
app.listen(config.PORT, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
})


