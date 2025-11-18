import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleJobPostings, handleJobDetails, handleJobApplication } from "./routes/job-postings";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Public job postings routes
  app.get("/api/public/jobs", handleJobPostings);
  app.get("/api/public/jobs/:jobPostingId", handleJobDetails);
  app.post("/api/public/jobs/:jobPostingId/apply", handleJobApplication);

  return app;
}
