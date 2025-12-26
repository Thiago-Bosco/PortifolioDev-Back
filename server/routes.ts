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

  app.get(api.certifications.list.path, async (req, res) => {
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

  const certs = await storage.getCertifications();
  if (certs.length === 0) {
    await storage.createCertification({ name: "Criando uma API REST em Go", issuer: "Rocketseat", date: "abr de 2025", credentialId: "d84da50d-af58-4008-b577-fcc3110eda8f" });
    await storage.createCertification({ name: "Integração com bancos de dados em Go", issuer: "Rocketseat", date: "abr de 2025", credentialId: "995afcf9-f564-417e-b5b0-5368d905a5f1" });
    await storage.createCertification({ name: "Conceitos Avançados de Go", issuer: "Rocketseat", date: "fev de 2025", credentialId: "b60049d9-b205-4bd6-b339-d2f572f96317" });
    await storage.createCertification({ name: "Fundamentos em Go", issuer: "Rocketseat", date: "jan de 2025", credentialId: "7c9c0b48-9034-47e9-9354-6121a0fdc57d" });
    await storage.createCertification({ name: "Formação Linguagem Go", issuer: "Alura", date: "nov de 2024", credentialId: "c3e5f4dd-619c-4c86-8d11-c29c89f74f3e" });
    await storage.createCertification({ name: "Go e Gin: criando API rest com simplicidade", issuer: "Alura", date: "nov de 2024", credentialId: "90881b74-1b88-4099-b7af-bed035810f64" });
    await storage.createCertification({ name: "Harmony SASE – Technical Specialist", issuer: "Check Point Software", date: "nov de 2024", credentialId: null });
    await storage.createCertification({ name: "Monitoramento: Prometheus, Grafana e Alertmanager", issuer: "Alura", date: "nov de 2024", credentialId: "6ac671dc-59dc-40a2-9ebe-e085f61b7899" });
    await storage.createCertification({ name: "Django: Formação crie aplicações em Python", issuer: "Alura", date: "set de 2024", credentialId: "492acfce-ba38-4c37-898b-fa13b6aed0e5" });
  }

  console.log("Database seeded successfully!");
}
