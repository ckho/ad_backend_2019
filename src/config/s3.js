import AWS from 'aws-sdk';

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region : process.env.REGION
});

const uploadParams = {
  Bucket: process.env.BUCKET, 
  Key: '', // pass key
  Body: null, // pass file body
};

const s3 = {
  s3Client: s3Client,
  uploadParams: uploadParams
};

export default s3;
