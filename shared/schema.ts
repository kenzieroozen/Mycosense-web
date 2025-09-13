import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const soilData = pgTable("soil_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  x: real("x").notNull(),
  y: real("y").notNull(),
  voltage: real("voltage").notNull(),
  pollutant: text("pollutant").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  uploadId: varchar("upload_id").notNull(),
});

export const uploads = pgTable("uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  totalRecords: integer("total_records").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSoilDataSchema = createInsertSchema(soilData).omit({
  id: true,
  timestamp: true,
});

export const insertUploadSchema = createInsertSchema(uploads).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SoilData = typeof soilData.$inferSelect;
export type InsertSoilData = z.infer<typeof insertSoilDataSchema>;
export type Upload = typeof uploads.$inferSelect;
export type InsertUpload = z.infer<typeof insertUploadSchema>;

export interface SoilAnalysisResult {
  riskAssessment: {
    leadContamination: 'Low' | 'Medium' | 'High';
    pfasLevels: 'Low' | 'Medium' | 'High';
    overallSafety: 'Safe' | 'Acceptable' | 'Dangerous';
  };
  recommendations: string[];
  statistics: {
    dataPointsAnalyzed: number;
    accuracy: number;
    analysisTime: number;
    lastUpdated: string;
  };
}
