import { PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3 from "../config/aws.js";
import { v4 as uuid } from "uuid";

export const uploadFileToS3 = async (file) => {
  const folderName = "images"; 
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderName}/${uuid()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  const result = await s3.send(command);
  return result; // contains ETag etc.
};

export const listFilesFromS3 = async () => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  const command = new ListObjectsV2Command(params);
  const data = await s3.send(command);
  return data.Contents.map((item) => ({
    key: item.Key,
    lastModified: item.LastModified,
    url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
  }));
};
