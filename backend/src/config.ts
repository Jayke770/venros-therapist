import envalid from 'envalid'
export const config = envalid.cleanEnv(process.env, {
    PORT: envalid.num({ default: 3000 }),
    MONGODB_URI: envalid.str(),
    JWT_SECRET: envalid.str(),
    DOMAINS: envalid.str(),
    MINIO_ENDPOINT: envalid.str(),
    MINIO_PORT: envalid.num(),
    MINIO_ACCESSKEY: envalid.str(),
    MINIO_SECRETKEY: envalid.str(),
    MINIO_BUCKET_NAME: envalid.str()
})