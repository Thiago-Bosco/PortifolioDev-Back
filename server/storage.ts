import { db } from "./db";
import {
  profile, skills, experiences, projects, educations, contacts,
  type Profile, type Skill, type Experience, type Project, type Education, type InsertContact
} from "@shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getSkills(): Promise<Skill[]>;
  getExperiences(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getEducations(): Promise<Education[]>;
  createContact(contact: InsertContact): Promise<void>;
  
  // Seed methods
  createProfile(data: any): Promise<void>;
  createSkill(data: any): Promise<void>;
  createExperience(data: any): Promise<void>;
  createProject(data: any): Promise<void>;
  createEducation(data: any): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [result] = await db.select().from(profile);
    return result;
  }
  
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }
  
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences);
  }
  
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  
  async getEducations(): Promise<Education[]> {
    return await db.select().from(educations);
  }
  
  async createContact(contact: InsertContact): Promise<void> {
    await db.insert(contacts).values(contact);
  }
  
  async createProfile(data: any): Promise<void> {
    await db.insert(profile).values(data);
  }
  async createSkill(data: any): Promise<void> {
    await db.insert(skills).values(data);
  }
  async createExperience(data: any): Promise<void> {
    await db.insert(experiences).values(data);
  }
  async createProject(data: any): Promise<void> {
    await db.insert(projects).values(data);
  }
  async createEducation(data: any): Promise<void> {
    await db.insert(educations).values(data);
  }
}

export const storage = new DatabaseStorage();
