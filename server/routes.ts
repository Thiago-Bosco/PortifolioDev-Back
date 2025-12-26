import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    res.json(profile || {});
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.experiences.list.path, async (req, res) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.educations.list.path, async (req, res) => {
    const educations = await storage.getEducations();
    res.json(educations);
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
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const profile = await storage.getProfile();
  if (profile) return; // Already seeded

  console.log("Seeding database...");

  await storage.createProfile({
    name: "Thiago Giovanni Bosco de Carvalho",
    title: "Desenvolvedor Backend | Analista de Infraestrutura de TI",
    summary: "Desenvolvedor Backend com sólida experiência em ambientes corporativos e financeiros de alta criticidade. Atuação em desenvolvimento de soluções backend e automações voltadas à otimização de processos operacionais, integração com sistemas de monitoramento e suporte a operações sensíveis. Forte base em infraestrutura, virtualização e ambientes regulados.",
    email: "thiago-carvalho789@outlook.com",
    phone: "(19) 98745-5492",
    location: "Hortolândia – SP",
    githubUrl: "https://github.com/Thiago-Bosco",
    linkedinUrl: "https://www.linkedin.com/in/thiago-giovanni-bosco"
  });

  await storage.createSkill({
    category: "Desenvolvimento Backend",
    items: ["Python", "Django", "APIs REST", "Golang", "C", "C++", "NodeJs"]
  });
  await storage.createSkill({
    category: "Automação e Integrações",
    items: ["Bots", "Scripts", "Integrações de Sistemas", "WhatsApp API"]
  });
  await storage.createSkill({
    category: "Infraestrutura e DevOps",
    items: ["Docker", "Linux", "Windows Server", "Hyper-V", "VMware", "vSphere", "Clusters"]
  });
  await storage.createSkill({
    category: "Banco de Dados",
    items: ["MySQL", "PostgreSQL", "MongoDB"]
  });
  await storage.createSkill({
    category: "Monitoramento",
    items: ["Zabbix", "Grafana"]
  });

  await storage.createExperience({
    company: "AltSec",
    role: "Desenvolvedor Backend / Analista de Infraestrutura de TI",
    period: "Fevereiro/2024 – Atual",
    description: "Atuação em operações de TI e desenvolvimento de software para clientes corporativos e instituições financeiras (C&C, Gokei Banco, BMP, Ouribank, etc). Responsável pelo desenvolvimento de soluções backend para suporte à operação, automação de processos, criação de sistemas internos e bots de automação."
  });

  await storage.createProject({
    title: "Finder – Plataforma de Procedimentos Operacionais",
    description: "Plataforma backend desenvolvida para centralizar e agilizar a consulta de procedimentos operacionais da equipe de TI.",
    technologies: ["Python 3.11", "Django 5.1", "MySQL", "Docker", "Nginx", "Gunicorn"],
    highlights: [
      "Organização de procedimentos por cliente e máquina",
      "Busca rápida, eficiente e segura",
      "Controle de autenticação e autorização",
      "Deploy em ambiente Docker"
    ]
  });

  await storage.createProject({
    title: "Bot de Automação de Alertas (Zabbix)",
    description: "Bot responsável por monitorar alertas do Zabbix em tempo quase real e automatizar a comunicação de incidentes.",
    technologies: ["NodeJs", "API Zabbix", "Integração WhatsApp"],
    highlights: [
      "Consulta automática de alertas a cada minuto",
      "Validação de alertas conforme ranges e regras",
      "Envio automático para grupos WhatsApp específicos",
      "Redução significativa de tarefas manuais"
    ]
  });

  await storage.createEducation({
    degree: "Engenharia de Software",
    institution: "Anhanguera University"
  });

  console.log("Database seeded successfully!");
}
