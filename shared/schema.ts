import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - required for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Brand settings table
export const brandSettings = pgTable("brand_settings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("تک پوش خاص"),
  slogan: text("slogan").notNull().default("یک از یک"),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// T-shirt images table
export const tshirtImages = pgTable("tshirt_images", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  alt: text("alt").notNull(),
  order: serial("order").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Social media links table
export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // instagram, telegram, tiktok, youtube
  url: text("url").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Copyright settings table
export const copyrightSettings = pgTable("copyright_settings", {
  id: serial("id").primaryKey(),
  text: text("text").notNull().default("© ۱۴۰۳ تک پوش خاص. تمامی حقوق محفوظ است."),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schemas for validation
export const insertBrandSettingsSchema = createInsertSchema(brandSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTshirtImageSchema = createInsertSchema(tshirtImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCopyrightSettingsSchema = createInsertSchema(copyrightSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type BrandSettings = typeof brandSettings.$inferSelect;
export type InsertBrandSettings = z.infer<typeof insertBrandSettingsSchema>;
export type TshirtImage = typeof tshirtImages.$inferSelect;
export type InsertTshirtImage = z.infer<typeof insertTshirtImageSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type CopyrightSettings = typeof copyrightSettings.$inferSelect;
export type InsertCopyrightSettings = z.infer<typeof insertCopyrightSettingsSchema>;
