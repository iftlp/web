import { Client } from 'minio'

const minioClient = new Client({
  endPoint: process.env.MINIO_URL ?? '',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
})

export default minioClient
