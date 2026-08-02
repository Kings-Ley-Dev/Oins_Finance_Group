import multer from "multer";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Only JPG, PNG, WEBP or PDF files are allowed"));
  },
});
