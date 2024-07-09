import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

// Định nghĩa kiểu dữ liệu cho file
interface IFile {
  mimetype: string;
  originalname: string;
}

// LÀ MỘT MIDDLEWARE CHO FILE

const storage = multer.diskStorage({
  destination: function (req: Request, file: IFile, cb: (error: Error | null, destination: string) => void) {
    cb(null, process.cwd() + "/storage/blog"); // process.cwd() lấy đường dẫn đến thư mục
  }, // nơi lưu trữ
  filename: function (req: Request, file: IFile, cb: (error: Error | null, filename: string) => void) {
    // tạo file name mới cho ảnh để không bị ghi đè
    const uniquePrefix = Date.now() + "-" + uuidv4();
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const fileFilter = function (req: Request, file: IFile, cb: FileFilterCallback) {
  const allowMimes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type invalid"));
  }
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB dung lượng file
  },
});
