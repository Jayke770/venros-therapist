import * as Minio from 'minio'
import { config } from '@/config'
import { nanoid } from 'nanoid'
import mime from 'mime'
import { UTApi } from "uploadthing/server";
export const utapi = new UTApi({
    apiKey: config.UPLOADTHING_SECRET
});
export interface IUpload {
    status: true,
    fileId: string
}
export interface IGetFileUrl {
    status: true,
    fileUrl: string
}

class Storage {
    private readonly getFileExpiry = 30 * 24 * 60 * 60
    private readonly bucketName = config.MINIO_BUCKET_NAME
    private readonly client = new Minio.Client({
        endPoint: config.MINIO_ENDPOINT,
        port: config.MINIO_PORT,
        useSSL: false,
        accessKey: config.MINIO_ACCESSKEY,
        secretKey: config.MINIO_SECRETKEY
    })
    async initializeBucket() {
        try {
            if (!await this.client.bucketExists(this.bucketName)) return await this.client.makeBucket(this.bucketName)
        } catch (e) {
            return
        }
    }
    async uploadFile(file: File): Promise<IUpload | { status: false }> {
        try {
            await this.initializeBucket()
            const arrbuf = await file.arrayBuffer();
            const buffer = Buffer.from(arrbuf);
            const objectName = `${nanoid(20)}.${mime.getExtension(file.type)}`
            await this.client.putObject(this.bucketName, objectName, buffer)
            return { status: true, fileId: objectName }
        } catch (e) {
            return { status: false }
        }
    }
    async getFileUrl(fileId: string): Promise<IGetFileUrl | { status: false }> {
        try {
            await this.initializeBucket()
            const fileUrl = await this.client.presignedUrl("GET", this.bucketName, fileId, this.getFileExpiry)
            return { status: true, fileUrl }
        } catch (e) {
            return { status: false }
        }
    }
}
export const storage = new Storage()