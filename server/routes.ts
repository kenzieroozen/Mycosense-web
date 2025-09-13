import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSoilDataSchema, insertUploadSchema } from "@shared/schema";
import multer from "multer";
import Papa from "papaparse";
import { z } from "zod";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload CSV file and process soil data
  app.post("/api/uploads", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const csvContent = req.file.buffer.toString("utf-8");
      
      // Parse CSV
      const parseResult = Papa.parse(csvContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });

      if (parseResult.errors.length > 0) {
        return res.status(400).json({ 
          message: "CSV parsing failed", 
          errors: parseResult.errors 
        });
      }

      // Validate CSV structure
      const expectedColumns = ["x", "y", "voltage", "pollutant"];
      const csvColumns = parseResult.meta.fields || [];
      
      const missingColumns = expectedColumns.filter(col => !csvColumns.includes(col));
      if (missingColumns.length > 0) {
        return res.status(400).json({
          message: `Missing required columns: ${missingColumns.join(", ")}`,
          expectedColumns,
          foundColumns: csvColumns,
        });
      }

      // Create upload record
      const uploadRecord = await storage.createUpload({
        filename: req.file.originalname,
        totalRecords: parseResult.data.length,
      });

      // Validate and insert soil data
      const soilDataArray = parseResult.data.map((row: any) => ({
        x: Number(row.x),
        y: Number(row.y),
        voltage: Number(row.voltage),
        pollutant: String(row.pollutant),
        uploadId: uploadRecord.id,
      }));

      // Validate each record
      const validationSchema = insertSoilDataSchema.array();
      const validatedData = validationSchema.parse(soilDataArray);

      // Store the data
      const savedData = await storage.createSoilData(validatedData);

      res.json({
        upload: uploadRecord,
        dataCount: savedData.length,
        message: "File uploaded and processed successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Data validation failed",
          errors: error.errors,
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all uploads
  app.get("/api/uploads", async (req, res) => {
    try {
      const uploads = await storage.getUploads();
      res.json(uploads);
    } catch (error) {
      console.error("Get uploads error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get soil data for a specific upload
  app.get("/api/uploads/:uploadId/data", async (req, res) => {
    try {
      const { uploadId } = req.params;
      const data = await storage.getSoilDataByUploadId(uploadId);
      res.json(data);
    } catch (error) {
      console.error("Get soil data error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get analysis results for a specific upload
  app.get("/api/uploads/:uploadId/analysis", async (req, res) => {
    try {
      const { uploadId } = req.params;
      const analysis = await storage.analyzeSoilData(uploadId);
      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all soil data
  app.get("/api/soil-data", async (req, res) => {
    try {
      const data = await storage.getAllSoilData();
      res.json(data);
    } catch (error) {
      console.error("Get all soil data error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
