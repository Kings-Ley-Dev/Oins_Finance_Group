import { v2 as cloudinary } from "cloudinary";

const configured = !!process.env.CLOUDINARY_CLOUD_NAME;

if (configured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}


// Uploads a buffer; falls back to a stub URL when Cloudinary isn't configured,
// so the flow runs end-to-end in development without credentials.
export async function uploadBuffer(buffer, folder = "oins/kyc") {
  if (!configured) {
    return { url: `https://sandbox.local/${folder}/${Date.now()}`, publicId: `stub_${Date.now()}` };
  }
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "auto" }, (err, result) => {
      if (err) return reject(err);
      resolve({ url: result.secure_url, publicId: result.public_id });
    });
    stream.end(buffer);
  });
}

export { configured as cloudinaryConfigured };
