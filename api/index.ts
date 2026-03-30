import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { storage } from "../server/storage";
import { api } from "../shared/routes";
import { z } from "zod";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(api.profile.get.path, async (_req, res) => {
  const profile = await storage.getProfile();
  res.json(profile || {});
});

app.get(api.skills.list.path, async (_req, res) => {
  const skills = await storage.getSkills();
  res.json(skills);
});

app.get(api.experiences.list.path, async (_req, res) => {
  const experiences = await storage.getExperiences();
  res.json(experiences);
});

app.get(api.projects.list.path, async (_req, res) => {
  const projects = await storage.getProjects();
  res.json(projects);
});

app.get(api.educations.list.path, async (_req, res) => {
  const educations = await storage.getEducations();
  res.json(educations);
});

app.get(api.certifications.list.path, async (_req, res) => {
  const certs = await storage.getCertifications();
  res.json(certs);
});

app.post(api.contact.submit.path, async (req, res) => {
  try {
    const input = api.contact.submit.input.parse(req.body);
    await storage.createContact(input);
    res.status(201).json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join("."),
      });
    }
    throw err;
  }
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;
