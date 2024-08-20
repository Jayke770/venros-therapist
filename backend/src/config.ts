import envalid from 'envalid'
export const config = envalid.cleanEnv(process.env, {
    PORT: envalid.num({ default: 3000 }),
    MONGODB_URI: envalid.str(),
    JWT_SECRET: envalid.str()
})