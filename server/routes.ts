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
  if (!profile) {
    console.log("Seeding profile...");
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
  }

  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    console.log("Seeding skills...");
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
  }

  const existingExperiences = await storage.getExperiences();
  if (existingExperiences.length === 0) {
    console.log("Seeding experiences...");
    await storage.createExperience({
      company: "AltSec",
      role: "Desenvolvedor Backend / Analista de Infraestrutura de TI",
      period: "Fevereiro/2024 – Atual",
      description: "Atuação em operações de TI e desenvolvimento de software para clientes corporativos e instituições financeiras (C&C, Gokei Banco, BMP, Ouribank, etc). Responsável pelo desenvolvimento de soluções backend para suporte à operação, automação de processos, criação de sistemas internos e bots de automação."
    });
  }

  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    console.log("Seeding projects...");
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
  }

  const existingEducations = await storage.getEducations();
  if (existingEducations.length === 0) {
    console.log("Seeding educations...");
    await storage.createEducation({
      degree: "Engenharia de Software",
      institution: "Anhanguera University"
    });
  }

  const certs = await storage.getCertifications();
  if (certs.length === 0) {
    console.log("Seeding certifications...");
    await storage.createCertification({ name: "Criando uma API REST em Go", issuer: "Rocketseat", date: "abr de 2025", credentialId: "d84da50d-af58-4008-b577-fcc3110eda8f" });
    await storage.createCertification({ name: "Integração com bancos de dados em Go", issuer: "Rocketseat", date: "abr de 2025", credentialId: "995afcf9-f564-417e-b5b0-5368d905a5f1" });
    await storage.createCertification({ name: "Conceitos Avançados de Go", issuer: "Rocketseat", date: "fev de 2025", credentialId: "b60049d9-b205-4bd6-b339-d2f572f96317" });
    await storage.createCertification({ name: "Fundamentos em Go", issuer: "Rocketseat", date: "jan de 2025", credentialId: "7c9c0b48-9034-47e9-9354-6121a0fdc57d" });
    await storage.createCertification({ name: "Formação Linguagem Go", issuer: "Alura", date: "nov de 2024", credentialId: "c3e5f4dd-619c-4c86-8d11-c29c89f74f3e" });
    await storage.createCertification({ name: "Go e Gin: criando API rest com simplicidade", issuer: "Alura", date: "nov de 2024", credentialId: "90881b74-1b88-4099-b7af-bed035810f64" });
    await storage.createCertification({ name: "Go: desenvolvendo uma API Rest", issuer: "Alura", date: "nov de 2024", credentialId: "60b07c68-b138-441a-963d-36a2eeb0d653" });
    await storage.createCertification({ name: "Go: validações, testes e páginas HTML", issuer: "Alura", date: "nov de 2024", credentialId: "2fa249e7-5ac0-4a12-846d-16cce6a1349d" });
    await storage.createCertification({ name: "Harmony SASE – Technical Specialist", issuer: "Check Point Software", date: "nov de 2024", credentialId: null });
    await storage.createCertification({ name: "Harmony SaaS – Technical Specialist", issuer: "Check Point Software", date: "nov de 2024", credentialId: null });
    await storage.createCertification({ name: "Monitoramento: Prometheus, Grafana e Alertmanager", issuer: "Alura", date: "nov de 2024", credentialId: "6ac671dc-59dc-40a2-9ebe-e085f61b7899" });
    await storage.createCertification({ name: "Quantum IoT – Technical Specialist", issuer: "Check Point Software", date: "nov de 2024", credentialId: null });
    await storage.createCertification({ name: "Go: Orientação a Objetos", issuer: "Alura", date: "out de 2024", credentialId: "c2d70113-e100-4e2d-8f8f-2368e98eef06" });
    await storage.createCertification({ name: "Go: a linguagem do Google", issuer: "Alura", date: "out de 2024", credentialId: "75a99d0d-336d-45f0-b187-a5defe4bcb2d" });
    await storage.createCertification({ name: "Go: crie uma aplicação web", issuer: "Alura", date: "out de 2024", credentialId: "21787807-319f-46d1-b0b8-560daf84045b" });
    await storage.createCertification({ name: "Minicurso de Java", issuer: "Rocketseat", date: "out de 2024", credentialId: "823c5be2-d59b-4fe3-846d-ef6156f3c30e" });
    await storage.createCertification({ name: "Minicurso de Python", issuer: "Rocketseat", date: "out de 2024", credentialId: "639a04e4-3306-49ae-9d88-6c965bfd5557" });
    await storage.createCertification({ name: "Django: CRUD e persistência no S3", issuer: "Alura", date: "set de 2024", credentialId: "877a3686-7c4e-40f2-a3ef-54e2d8dd65f4" });
    await storage.createCertification({ name: "Django: autenticação de formulários e alerta", issuer: "Alura", date: "set de 2024", credentialId: "1aaccd9c-a42a-4743-becc-bea9820a7193" });
    await storage.createCertification({ name: "Django: persistência de dados e Admin", issuer: "Alura", date: "set de 2024", credentialId: "643c8567-8ef1-43da-9be4-00773bf4315d" });
    await storage.createCertification({ name: "Django: templates e boas práticas", issuer: "Alura", date: "set de 2024", credentialId: "6b32e4d6-e05b-4391-bb99-0cdeafbf11be" });
    await storage.createCertification({ name: "Formação Django: crie aplicações em Python", issuer: "Alura", date: "set de 2024", credentialId: "492acfce-ba38-4c37-898b-fa13b6aed0e5" });
    await storage.createCertification({ name: "Formação Aprenda a programar em Python com Orientação a Objetos", issuer: "Alura", date: "ago de 2024", credentialId: "968e4a1c-9225-4eb7-9ac1-0d9488c5cd79" });
    await storage.createCertification({ name: "Git e GitHub: compartilhando e colaborando em projetos", issuer: "Alura", date: "ago de 2024", credentialId: "c9551931-0a28-408e-acfd-77a5f0387dfc" });
    await storage.createCertification({ name: "Python: análise de dados com SQL", issuer: "Alura", date: "ago de 2024", credentialId: "a35bac31-f494-42f4-a7cf-95d09172e3bf" });
    await storage.createCertification({ name: "Python: aplicando a Orientação a Objetos", issuer: "Alura", date: "ago de 2024", credentialId: "30ec28b8-6925-46a0-bfa4-01d7b9b68af5" });
    await storage.createCertification({ name: "Python: avance na Orientação a Objetos e consuma API", issuer: "Alura", date: "ago de 2024", credentialId: "5696d84b-257a-4291-98ce-c90473c64cda" });
    await storage.createCertification({ name: "Scripting: automação de tarefas com Python e criação de Pipelines no Jenkins", issuer: "Alura", date: "ago de 2024", credentialId: "97eb9b20-c20e-4d74-9d61-83ae09d55cec" });
    await storage.createCertification({ name: "String em Python: extraindo informações de uma URL", issuer: "Alura", date: "ago de 2024", credentialId: "25229b2e-90b6-4ab8-a538-7bbf448e0038" });
    await storage.createCertification({ name: "CloudGuard Pre-Sales - Technical Specialist", issuer: "Check Point Software", date: "jul de 2024", credentialId: null });
    await storage.createCertification({ name: "Python: crie a sua primeira aplicação", issuer: "Alura", date: "jul de 2024", credentialId: "fbbb8b96-a8c6-4b4d-8b16-53c3a2bddad9" });
    await storage.createCertification({ name: "Welcome Partners (CPSC)", issuer: "Check Point Software", date: "jun de 2024", credentialId: null });
    await storage.createCertification({ name: "Introduction to the Threat Landscape 2.0", issuer: "Fortinet", date: "mai de 2024", credentialId: null });
    await storage.createCertification({ name: "MSSP Certification", issuer: "Check Point Software", date: "nov de 2024", credentialId: null });
  }

  console.log("Database seed check completed!");
}
