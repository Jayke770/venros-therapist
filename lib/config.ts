import envValid from 'envalid'

export const envConfig = envValid.cleanEnv(process.env, {
    AUTH_SECRET: envValid.str(),
    MONGODB_URI: envValid.str()
})