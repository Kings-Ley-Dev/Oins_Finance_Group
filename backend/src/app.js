import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import webhookRoutes from "./routes/webhook.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// This looks past Namecheap's reverse proxy to get correct user IPs
app.set("trust proxy", 1);

app.use(helmet());

// BULLETPROOF PRODUCTION CORS CONFIGURATION 
const allowedOrigins = [
  "https://oinsfinancegroup.com",
  "https://www.oinsfinancegroup.com"
];

app.use(
  cors({ 
    origin: function (origin, callback) {
      // Allow requests with no origin (like Thunder Client, curl, or mobile apps)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || origin.startsWith("http://localhost");
      
      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`[CORS Blocked]: Request from origin ${origin} rejected.`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true 
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Webhooks need the raw body for signature verification - mount before json()
app.use("/api/v1/webhooks", express.raw({ type: "*/*" }), webhookRoutes);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// ── Rate Limiter + Route Mount (Adds /api/v1 prefix) ──
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes."
  }
});

app.use("/api/v1", apiLimiter, routes);

// ── Health Check ──
app.get("/api/health", (req, res) => {
  res.json({ success: true, service: "Oins Finance API", status: "ok" });
});

// ── Error Handling Middleware ──
app.use(notFound);
app.use(errorHandler);

export default app;