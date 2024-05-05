import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dj3ww42m7",
  api_key: "787773237836658",
  api_secret: "fpvxSprYkhJFUy0nRMNBr80JR8U",
});

const uploadFileToCloudinary = async (
  filePath,
  fileName,
  uploadObject = {}
) => {
  const cloudinaryResponse = await cloudinary.uploader.upload(
    filePath,
    uploadObject
  );
  if (!cloudinaryResponse.url)
    throw new Error("Error: uploading file to cloudinary");

  return {
    fileName: fileName,
    url: cloudinaryResponse.secure_url,
  };
};

export default { uploadFileToCloudinary };
