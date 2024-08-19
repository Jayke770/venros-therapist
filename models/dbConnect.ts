//@ts-nocheck
import mongoose from "mongoose";
import { envConfig } from "@/lib/config";
const MONGODB_URI = envConfig.MONGODB_URI;
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function dbConnect() {
    const opts = {
        bufferCommands: false,
    };
    if (envConfig.isDevelopment) {
        if (cached.conn) {
            return cached.conn;
        }
        if (!cached.promise) {
            cached.promise = await mongoose.connect(MONGODB_URI, opts);
        }
        try {
            cached.conn = await cached.promise;
        } catch (e) {
            cached.promise = null;
            throw e;
        }
    } else {
        cached.promise = await mongoose.connect(MONGODB_URI, opts);
    }
    return cached.conn;
}
export default dbConnect;