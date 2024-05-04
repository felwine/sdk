import * as Minio from 'minio'

export default async ({
  auth,
}) => {

  try {
    const {
      endPoint,
      accessKey,
      secretKey,
      bucketName
    } = auth

    const minioClient = new Minio.Client({
      endPoint,
      accessKey,
      secretKey,
    })

    const exists = await minioClient.bucketExists(bucketName)
    return {
      isValid: exists,
    }
  } catch (e) {

    return {
      isValid: false,
      error: e
    }
  }
  return false
}
