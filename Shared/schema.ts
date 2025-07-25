import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  program: varchar("program", { length: 255 }).notNull(),
  year: varchar("year", { length: 50 }).notNull(),
  profileComplete: boolean("profile_complete").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  bio: text("bio"),
  studyStyle: text("study_style"),
  studySpot: text("study_spot"),
  photos: jsonb("photos").$type<string[]>().default([]),
  classes: jsonb("classes").$type<string[]>().default([]),
  activities: jsonb("activities").$type<string[]>().default([]),
  interests: jsonb("interests").$type<string[]>().default([]),
  studyHabits: jsonb("study_habits").$type<string[]>().default([]),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const clubs = pgTable("clubs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  memberCount: integer("member_count").default(0),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clubMemberships = pgTable("club_memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  clubId: integer("club_id").references(() => clubs.id).notNull(),
  role: varchar("role", { length: 50 }).default("member"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const studyGroups = pgTable("study_groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  subject: varchar("subject", { length: 255 }).notNull(),
  maxMembers: integer("max_members").default(6),
  currentMembers: integer("current_members").default(1),
  creatorId: integer("creator_id").references(() => users.id).notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  meetingTime: text("meeting_time"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const studyGroupMembers = pgTable("study_group_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  studyGroupId: integer("study_group_id").references(() => studyGroups.id).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id).notNull(),
  recipientId: integer("recipient_id").references(() => users.id),
  studyGroupId: integer("study_group_id").references(() => studyGroups.id),
  content: text("content").notNull(),
  messageType: varchar("message_type", { length: 50 }).default("text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const anonymousVibes = pgTable("anonymous_vibes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sharedNotes = pgTable("shared_notes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  authorId: integer("author_id").references(() => users.id).notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  downloads: integer("downloads").default(0),
  fileUrl: text("file_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const profileLikes = pgTable("profile_likes", {
  id: serial("id").primaryKey(),
  likerId: integer("liker_id").references(() => users.id).notNull(),
  likedId: integer("liked_id").references(() => users.id).notNull(),
  likeType: varchar("like_type", { length: 50 }).default("profile"),
  specificField: varchar("specific_field", { length: 100}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  user1Id: integer("user1_id").references(() => users.id).notNull(),
  user2Id: integer("user2_id").references(() => users.id).notNull(),
  matchType: varchar("match_type", { length: 50 }).default("study"),
  compatibilityScore: integer("compatibility_score"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  clubMemberships: many(clubMemberships),
  studyGroupMemberships: many(studyGroupMembers),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  sharedNotes: many(sharedNotes),
  sentLikes: many(profileLikes, { relationName: "sentLikes" }),
  receivedLikes: many(profileLikes, { relationName: "receivedLikes" }),
  matches1: many(matches, { relationName: "matches1" }),
  matches2: many(matches, { relationName: "matches2" }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));

export const clubsRelations = relations(clubs, ({ many }) => ({
  memberships: many(clubMemberships),
}));

export const clubMembershipsRelations = relations(clubMemberships, ({ one }) => ({
  user: one(users, { fields: [clubMemberships.userId], references: [users.id] }),
  club: one(clubs, { fields: [clubMemberships.clubId], references: [clubs.id] }),
}));

export const studyGroupsRelations = relations(studyGroups, ({ one, many }) => ({
  creator: one(users, { fields: [studyGroups.creatorId], references: [users.id] }),
  members: many(studyGroupMembers),
  messages: many(messages),
}));

export const studyGroupMembersRelations = relations(studyGroupMembers, ({ one }) => ({
  user: one(users, { fields: [studyGroupMembers.userId], references: [users.id] }),
  studyGroup: one(studyGroups, { fields: [studyGroupMembers.studyGroupId], references: [studyGroups.id] }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, { fields: [messages.senderId], references: [users.id], relationName: "sentMessages" }),
  recipient: one(users, { fields: [messages.recipientId], references: [users.id], relationName: "receivedMessages" }),
  studyGroup: one(studyGroups, { fields: [messages.studyGroupId], references: [studyGroups.id] }),
}));

export const sharedNotesRelations = relations(sharedNotes, ({ one }) => ({
  author: one(users, { fields: [sharedNotes.authorId], references: [users.id] }),
}));

export const profileLikesRelations = relations(profileLikes, ({ one }) => ({
  liker: one(users, { fields: [profileLikes.likerId], references: [users.id], relationName: "sentLikes" }),
  liked: one(users, { fields: [profileLikes.likedId], references: [users.id], relationName: "receivedLikes" }),
}));

export const matchesRelations = relations(matches, ({ one }) => ({
  user1: one(users, { fields: [matches.user1Id], references: [users.id], relationName: "matches1" }),
  user2: one(users, { fields: [matches.user2Id], references: [users.id], relationName: "matches2" }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  profileComplete: true,
  createdAt: true,
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  updatedAt: true,
});

export const insertClubSchema = createInsertSchema(clubs).omit({
  id: true,
  memberCount: true,
  createdAt: true,
});

export const insertStudyGroupSchema = createInsertSchema(studyGroups).omit({
  id: true,
  currentMembers: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertAnonymousVibeSchema = createInsertSchema(anonymousVibes).omit({
  id: true,
  likes: true,
  createdAt: true,
});

export const insertSharedNoteSchema = createInsertSchema(sharedNotes).omit({
  id: true,
  downloads: true,
  createdAt: true,
});

export const insertProfileLikeSchema = createInsertSchema(profileLikes).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Club = typeof clubs.$inferSelect;
export type InsertClub = z.infer<typeof insertClubSchema>;
export type StudyGroup = typeof studyGroups.$inferSelect;
export type InsertStudyGroup = z.infer<typeof insertStudyGroupSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type AnonymousVibe = typeof anonymousVibes.$inferSelect;
export type InsertAnonymousVibe = z.infer<typeof insertAnonymousVibeSchema>;
export type SharedNote = typeof sharedNotes.$inferSelect;
export type InsertSharedNote = z.infer<typeof insertSharedNoteSchema>;
export type ProfileLike = typeof profileLikes.$inferSelect;
export type InsertProfileLike = z.infer<typeof insertProfileLikeSchema>;
export type Match = typeof matches.$inferSelect;
export type ClubMembership = typeof clubMemberships.$inferSelect;
export type StudyGroupMember = typeof studyGroupMembers.$inferSelect;
