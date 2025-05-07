import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const sendImagesToCloudinary = (
  images: { imageName: string; path: string }[],
): Promise<UploadApiResponse[]> => {
  return Promise.all(
    images.map(({ imageName, path }) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload(
          path,
          { public_id: imageName.trim() },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as UploadApiResponse);
              // Delete the file from local storage
              fs.unlink(path, (err) => {
                if (err) console.error(`Error deleting file ${path}:`, err);
                else console.log(`File ${path} deleted.`);
              });
            }
          },
        );
      });
    }),
  );
};

export const sendProfileImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);
        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};

// Local Storage Configuration
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer Upload Middleware (Multiple Files)
const uploadLocal = multer({ storage: localStorage });

export { uploadLocal };
