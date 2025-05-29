import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";
import multer from "multer";

// Configure Cloudinary with proper string values
cloudinary.config({
  cloud_name: "dk3w4oc4d",
  api_key: "938762974275757",
  api_secret: "HkszsuneF29ZD4PRabUycb8pLYw",
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          // Delete the file even if upload fails
          fs.unlink(path, (unlinkError) => {
            if (unlinkError) console.error("Failed to delete file:", unlinkError);
            reject(error);
          });
          return;
        }

        // Delete file after successful upload
        fs.unlink(path, (unlinkError) => {
          if (unlinkError) {
            console.error("Failed to delete file:", unlinkError);
            // Still resolve if the upload succeeded but deletion failed
            if (result) resolve(result);
            else reject(unlinkError);
          } else {
            if (result) resolve(result);
            else reject(new Error("Upload result is undefined"));
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });