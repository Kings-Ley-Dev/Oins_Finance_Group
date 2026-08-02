import "dotenv/config";

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); 

import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initSockets } from "./sockets/socketHandler.js";
import { v2 as cloudinary } from "cloudinary";

const PORT = process.env.PORT || 5000;  

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = http.createServer(app);
    initSockets(server);
    server.listen(PORT, () => console.log(`[server] listening on :${PORT}`));
  } catch (err) {
    console.error("[server] failed to start:", err.message);
    process.exit(1);
  }
})();

// DETAILS OF CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
