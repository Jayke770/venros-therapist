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
const app = new Elysia({ serve: { reusePort: true } })
  .use(cors({ origin: true, credentials: true }))
  .use(jwt({
    name: "jwt",
    secret: config.JWT_SECRET,
    exp: "30d",
    schema: t.Object({
      id: t.String(),
      name: t.String(),
      address: t.String(),
      dob: t.Date(),
      email: t.String(),
      gender: t.String(),
      userType: t.Union([t.Literal("user"), t.Literal("admin"), t.Literal("therapist")]),
    })
  }))
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
  if (path.startsWith("/api") && !["/api/auth/signin", "/api/auth/signup", "/api/auth/logout"].includes(path)) {
    const isValidAuth = await jwt.verify(cookie.auth.value)
    console.log("faf", isValidAuth, cookie.auth.value)
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


