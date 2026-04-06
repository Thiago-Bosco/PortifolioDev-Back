import {
  profile, skills, experiences, projects, educations, contacts, certifications,
  type Profile, type Skill, type Experience, type Project, type Education, type InsertContact, type Certification
} from "@shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getSkills(): Promise<Skill[]>;
  getExperiences(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getEducations(): Promise<Education[]>;
  getCertifications(): Promise<Certification[]>;
  createContact(contact: InsertContact): Promise<void>;
}

export class MemStorage implements IStorage {
  private profile: Profile;
  private skills: Skill[];
  private experiences: Experience[];
  private projects: Project[];
  private educations: Education[];
  private certifications: Certification[];
  private contacts: (InsertContact & { id: number })[];
  private nextContactId: number = 1;

  constructor() {
    this.profile = {
      id: 1,
      name: "Thiago Giovanni Bosco de Carvalho",
      title: "Desenvolvedor Backend | Analista de Infraestrutura de TI",
      summary: "Desenvolvedor Backend com sólida experiência em ambientes corporativos e financeiros de alta criticidade. Atuação em desenvolvimento de soluções backend e automações voltadas à otimização de processos operacionais, integração com sistemas de monitoramento e suporte a operações sensíveis. Forte base em infraestrutura, virtualização e ambientes regulados.",
      email: "thiago-carvalho789@outlook.com",
      phone: "(19) 98745-5492",
      location: "Hortolândia – SP",
      githubUrl: "https://github.com/Thiago-Bosco",
      linkedinUrl: "https://www.linkedin.com/in/thiago-giovanni-bosco"
    };

    this.skills = [
      { id: 1, category: "Desenvolvimento Backend", items: ["Python", "Django", "APIs REST", "Golang", "C", "C++", "NodeJs"] },
      { id: 2, category: "Automação e Integrações", items: ["Bots", "Scripts", "Integrações de Sistemas", "WhatsApp API"] },
      { id: 3, category: "Infraestrutura e DevOps", items: ["Docker", "Linux", "Windows Server", "Hyper-V", "VMware", "vSphere", "Clusters"] },
      { id: 4, category: "Banco de Dados", items: ["MySQL", "PostgreSQL", "MongoDB"] },
      { id: 5, category: "Monitoramento", items: ["Zabbix", "Grafana"] }
    ];

    this.experiences = [
      {
        id: 1,s
        company: "AltSec",
        role: "Desenvolvedor Backend / Analista de Infraestrutura de TI",
        period: "Fevereiro/2024 – Atual",
        description: "Atuação em operações de TI e desenvolvimento de software para clientes corporativos e instituições financeiras (C&C, {Gokei - Banco, BMP, Ouribank}, Santa Casa - SP, Gcom, Luft , Sphere etc). Responsável pelo desenvolvimento de soluções backend para suporte à operação, automação de processos, criação de sistemas internos e bots de automação."
      }
    ];

    this.projects = [
      {
        id: 1,
        title: "Finder – Plataforma de Procedimentos Operacionais",
        description: "Plataforma backend desenvolvida para centralizar e agilizar a consulta de procedimentos operacionais da equipe de TI.",
        technologies: ["Python 3.11", "Django 5.1", "MySQL", "Docker", "Nginx", "Gunicorn"],
        highlights: [
          "Organização de procedimentos por cliente e máquina",
          "Busca rápida, eficiente e segura",
          "Controle de autenticação e autorização",
          "Deploy em ambiente Docker"
        ]
      },
      {
        id: 2,
        title: "Bot de Automação de Alertas (Zabbix)",
        description: "Bot responsável por monitorar alertas do Zabbix em tempo quase real e automatizar a comunicação de incidentes.",
        technologies: ["NodeJs", "API Zabbix", "Integração WhatsApp"],
        highlights: [
          "Consulta automática de alertas a cada minuto",
          "Validação de alertas conforme ranges e regras",
          "Envio automático para grupos WhatsApp específicos",
          "Redução significativa de tarefas manuais"
        ]
      },
      {
        id: 3,
        title: "Network Manager TUI",
        description: "Interface de terminal desenvolvida em Go para gerenciamento de redes Linux, simplificando a configuração e monitoramento via NetworkManager.",
        technologies: ["Go", "tview", "tcell", "NetworkManager", "nmcli"],
        highlights: [
          "Interface TUI intuitiva para administração de rede",
          "Configuração de IPv4 e IPv6 (manual e DHCP)",
          "Validação de entradas e execução segura de comandos",
          "Suporte a múltiplos idiomas (i18n)",
          "Execução em modo desenvolvimento e produção"
        ]
      },
      {
        id: 4,
        title: "Zabbix Host Exporter",
        description: "Automação para coleta de dados de hosts do Zabbix e geração de relatórios em CSV para auditoria e análise de infraestrutura.",
        technologies: ["Go", "Zabbix API", "CSV"],
        highlights: [
          "Integração direta com a API do Zabbix",
          "Extração automatizada de hostid e nome dos hosts",
          "Geração de relatórios em CSV prontos para uso",
          "Facilita auditorias e análise de ambientes monitorados",
          "Execução simples e rápida para ambientes de grande escala"
        ]
      }
    ];
    this.educations = [
      { id: 1, degree: "Engenharia de Software", institution: "Anhanguera University" }
    ];

    this.certifications = [
      { id: 1, name: "Criando uma API REST em Go", issuer: "Rocketseat", date: "abr de 2025", credentialId: "d84da50d-af58-4008-b577-fcc3110eda8f" },
      { id: 2, name: "Integração com bancos de dados em Go", issuer: "Rocketseat", date: "abr de 2025", credentialId: "995afcf9-f564-417e-b5b0-5368d905a5f1" },
      { id: 3, name: "Conceitos Avançados de Go", issuer: "Rocketseat", date: "fev de 2025", credentialId: "b60049d9-b205-4bd6-b339-d2f572f96317" },
      { id: 4, name: "Fundamentos em Go", issuer: "Rocketseat", date: "jan de 2025", credentialId: "7c9c0b48-9034-47e9-9354-6121a0fdc57d" },
      { id: 5, name: "Formação Linguagem Go", issuer: "Alura", date: "nov de 2024", credentialId: "c3e5f4dd-619c-4c86-8d11-c29c89f74f3e" },
      { id: 6, name: "Go e Gin: criando API rest com simplicidade", issuer: "Alura", date: "nov de 2024", credentialId: "90881b74-1b88-4099-b7af-bed035810f64" },
      { id: 7, name: "Go: desenvolvendo uma API Rest", issuer: "Alura", date: "nov de 2024", credentialId: "60b07c68-b138-441a-963d-36a2eeb0d653" },
      { id: 8, name: "Go: validações, testes e páginas HTML", issuer: "Alura", date: "nov de 2024", credentialId: "2fa249e7-5ac0-4a12-846d-16cce6a1349d" },
      { id: 9, name: "Harmony SASE – Technical Specialist", issuer: "Check Point Software", date: "nov de 2024", credentialId: null },
      { id: 10, name: "Harmony SaaS – Technical Specialist", issuer: "Check Point Software", date: "nov de 2024", credentialId: null },
      { id: 11, name: "Monitoramento: Prometheus, Grafana e Alertmanager", issuer: "Alura", date: "nov de 2024", credentialId: "6ac671dc-59dc-40a2-9ebe-e085f61b7899" },
      { id: 12, name: "Quantum IoT – Technical Specialist", issuer: "Check Point Software", date: "nov de 2024", credentialId: null },
      { id: 13, name: "Go: Orientação a Objetos", issuer: "Alura", date: "out de 2024", credentialId: "c2d70113-e100-4e2d-8f8f-2368e98eef06" },
      { id: 14, name: "Go: a linguagem do Google", issuer: "Alura", date: "out de 2024", credentialId: "75a99d0d-336d-45f0-b187-a5defe4bcb2d" },
      { id: 15, name: "Go: crie uma aplicação web", issuer: "Alura", date: "out de 2024", credentialId: "21787807-319f-46d1-b0b8-560daf84045b" },
      { id: 16, name: "Minicurso de Java", issuer: "Rocketseat", date: "out de 2024", credentialId: "823c5be2-d59b-4fe3-846d-ef6156f3c30e" },
      { id: 17, name: "Minicurso de Python", issuer: "Rocketseat", date: "out de 2024", credentialId: "639a04e4-3306-49ae-9d88-6c965bfd5557" },
      { id: 18, name: "Django: CRUD e persistência no S3", issuer: "Alura", date: "set de 2024", credentialId: "877a3686-7c4e-40f2-a3ef-54e2d8dd65f4" },
      { id: 19, name: "Django: autenticação de formulários e alerta", issuer: "Alura", date: "set de 2024", credentialId: "1aaccd9c-a42a-4743-becc-bea9820a7193" },
      { id: 20, name: "Django: persistência de dados e Admin", issuer: "Alura", date: "set de 2024", credentialId: "643c8567-8ef1-43da-9be4-00773bf4315d" },
      { id: 21, name: "Django: templates e boas práticas", issuer: "Alura", date: "set de 2024", credentialId: "6b32e4d6-e05b-4391-bb99-0cdeafbf11be" },
      { id: 22, name: "Formação Django: crie aplicações em Python", issuer: "Alura", date: "set de 2024", credentialId: "492acfce-ba38-4c37-898b-fa13b6aed0e5" },
      { id: 23, name: "Formação Aprenda a programar em Python com Orientação a Objetos", issuer: "Alura", date: "ago de 2024", credentialId: "968e4a1c-9225-4eb7-9ac1-0d9488c5cd79" },
      { id: 24, name: "Git e GitHub: compartilhando e colaborando em projetos", issuer: "Alura", date: "ago de 2024", credentialId: "c9551931-0a28-408e-acfd-77a5f0387dfc" },
      { id: 25, name: "Python: análise de dados com SQL", issuer: "Alura", date: "ago de 2024", credentialId: "a35bac31-f494-42f4-a7cf-95d09172e3bf" },
      { id: 26, name: "Python: aplicando a Orientação a Objetos", issuer: "Alura", date: "ago de 2024", credentialId: "30ec28b8-6925-46a0-bfa4-01d7b9b68af5" },
      { id: 27, name: "Python: avance na Orientação a Objetos e consuma API", issuer: "Alura", date: "ago de 2024", credentialId: "5696d84b-257a-4291-98ce-c90473c64cda" },
      { id: 28, name: "Scripting: automação de tarefas com Python e criação de Pipelines no Jenkins", issuer: "Alura", date: "ago de 2024", credentialId: "97eb9b20-c20e-4d74-9d61-83ae09d55cec" },
      { id: 29, name: "String em Python: extraindo informações de uma URL", issuer: "Alura", date: "ago de 2024", credentialId: "25229b2e-90b6-4ab8-a538-7bbf448e0038" },
      { id: 30, name: "CloudGuard Pre-Sales - Technical Specialist", issuer: "Check Point Software", date: "jul de 2024", credentialId: null },
      { id: 31, name: "Python: crie a sua primeira aplicação", issuer: "Alura", date: "jul de 2024", credentialId: "fbbb8b96-a8c6-4b4d-8b16-53c3a2bddad9" },
      { id: 32, name: "Welcome Partners (CPSC)", issuer: "Check Point Software", date: "jun de 2024", credentialId: null },
      { id: 33, name: "Introduction to the Threat Landscape 2.0", issuer: "Fortinet", date: "mai de 2024", credentialId: null },
      { id: 34, name: "MSSP Certification", issuer: "Check Point Software", date: "nov de 2024", credentialId: null }
    ];

    this.contacts = [];
  }

  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getExperiences(): Promise<Experience[]> {
    return this.experiences;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getEducations(): Promise<Education[]> {
    return this.educations;
  }

  async getCertifications(): Promise<Certification[]> {
    return this.certifications;
  }

  async createContact(contact: InsertContact): Promise<void> {
    const newContact = { ...contact, id: this.nextContactId++ };
    this.contacts.push(newContact);
  }
}

export const storage = new MemStorage();
