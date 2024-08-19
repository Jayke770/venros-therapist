import envValid from 'envalid'

export const envConfig = envValid.cleanEnv(process.env, {
    AUTH_SECRET: envValid.str({ default: "" }),
    MONGODB_URI: envValid.str({ default: "" })
})