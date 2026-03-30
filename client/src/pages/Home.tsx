import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { SectionHeading } from "@/components/SectionHeading";
import { TerminalCard } from "@/components/TerminalCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useProfile, useSkills, useExperiences, useProjects, useEducations, useCertifications, useContact } from "@/hooks/use-portfolio";
import { Github, Linkedin, Mail, MapPin, Download, Terminal, Database, Server, Cpu, Globe, ArrowRight, Loader2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactSchema } from "@shared/routes";

// --- Hero Section ---
function HeroSection() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (!profile) return null;

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary mb-4">Olá, meu nome é</p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight leading-tight">
            {profile.name}.
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-muted-foreground mb-6 tracking-tight leading-tight">
            {profile.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8">
            {profile.summary}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <ScrollLink to="projects" smooth={true} offset={-100}>
              <Button size="lg" className="h-12 px-8 font-mono text-sm bg-primary text-primary-foreground hover:bg-primary/90">
                Ver meus projetos
              </Button>
            </ScrollLink>
            <Button variant="outline" size="lg" className="h-12 px-8 font-mono text-sm border-primary text-primary hover:bg-primary/10">
              <Download className="mr-2 h-4 w-4" /> Baixar Currículo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block"
        >
          <TerminalCard title="profile.json" className="max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="text-green-400">
              <span className="text-purple-400">const</span> <span className="text-yellow-400">desenvolvedor</span> = {"{"}
            </div>
            <div className="pl-4">
              <div>nome: <span className="text-orange-400">"{profile.name}"</span>,</div>
              <div>cargo: <span className="text-orange-400">"{profile.title}"</span>,</div>
              <div>localização: <span className="text-orange-400">"{profile.location}"</span>,</div>
              <div>habilidades: [</div>
              <div className="pl-4 text-orange-400">"Node.js", "TypeScript", "PostgreSQL", "Cloud Architecture"</div>
              <div>],</div>
              <div>aberto_a_oportunidades: <span className="text-blue-400">true</span></div>
            </div>
            <div className="text-green-400">{"}"};</div>
          </TerminalCard>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-muted-foreground">
        <ScrollLink to="about" smooth={true} offset={-100} className="cursor-pointer">
          <ArrowRight className="w-6 h-6 rotate-90" />
        </ScrollLink>
      </div>
    </section>
  );
}

// --- About Section ---
function AboutSection() {
  const { data: profile } = useProfile();
  
  if (!profile) return null;

  return (
    <section id="about" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6">
        <SectionHeading title="Sobre Mim" subtitle="Quem sou e o que faço" number="01" />
        
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 text-muted-foreground space-y-6 leading-relaxed text-lg">
            <p>
              Sou especializado na construção de sistemas backend robustos e infraestrutura escalável.
              Minha paixão está em arquitetar soluções eficientes para problemas complexos, especialmente em ambientes cloud.
            </p>
            <p>
              Com uma sólida base em <span className="text-primary">Node.js, TypeScript e SQL</span>, tenho entregado aplicações de alta performance em diversos domínios.
              Acredito em código limpo, testes rigorosos e integração contínua.
            </p>
            <p>
              Quando não estou programando, geralmente estou pesquisando as mais recentes tecnologias cloud, contribuindo para o open source ou otimizando minha configuração de servidor pessoal.
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            <div className="relative z-10 bg-background border-2 border-primary/30 rounded-lg overflow-hidden aspect-square flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
               <Terminal className="w-24 h-24 text-primary/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Skills Section ---
function SkillsSection() {
  const { data: skills } = useSkills();

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "backend": return <Server className="w-6 h-6 mb-2 text-primary" />;
      case "frontend": return <Globe className="w-6 h-6 mb-2 text-blue-400" />;
      case "infrastructure": return <Cpu className="w-6 h-6 mb-2 text-orange-400" />;
      case "database": return <Database className="w-6 h-6 mb-2 text-purple-400" />;
      default: return <Terminal className="w-6 h-6 mb-2 text-primary" />;
    }
  };

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Arsenal Técnico" subtitle="Ferramentas e tecnologias com as quais trabalho" number="02" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills?.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-secondary/30 border border-white/5 p-6 rounded-lg hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 group"
            >
              {getIcon(skill.category)}
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-muted-foreground font-mono">
                    <span className="text-primary mr-2">▹</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Experience Section ---
function ExperienceSection() {
  const { data: experiences } = useExperiences();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6">
        <SectionHeading title="Onde Trabalhei" subtitle="Minha jornada profissional" number="03" />

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto mt-12">
          {/* Tab List */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-white/10 min-w-max">
            {experiences?.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 text-sm font-mono text-left whitespace-nowrap transition-all duration-200 border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:-mb-0 md:-ml-[2px] ${
                  activeTab === index 
                    ? "text-primary border-primary bg-primary/5" 
                    : "text-muted-foreground border-transparent hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-h-[300px]">
            {experiences && experiences[activeTab] && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {experiences[activeTab].role} <span className="text-primary">@ {experiences[activeTab].company}</span>
                </h3>
                <p className="font-mono text-sm text-muted-foreground mb-6">
                  {experiences[activeTab].period}
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                   {experiences[activeTab].description.split('\n').map((line, i) => (
                     <div key={i} className="flex items-start">
                       <span className="text-primary mr-3 mt-1.5 text-xs">▹</span>
                       <p>{line.trim().replace(/^-\s*/, '')}</p>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Projects Section ---
function ProjectsSection() {
  const { data: projects } = useProjects();

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Projetos Desenvolvidos" subtitle="Projetos em destaque" number="04" />

        <div className="space-y-24 mt-16">
          {projects?.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              {/* Project Content */}
              <div className={`w-full relative z-20`}>
                <p className="font-mono text-primary text-sm mb-2">Projeto em Destaque</p>
                <h3 className="text-2xl font-bold text-foreground mb-4">{project.title}</h3>
                
                <div className="bg-[#112240] p-6 rounded shadow-xl text-muted-foreground text-sm leading-relaxed mb-6">
                  {project.description}
                </div>
                
                <div className="flex flex-wrap gap-3 mb-8 text-xs font-mono text-muted-foreground">
                  {project.technologies.map(tech => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href="#" className="text-foreground hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors"><Globe className="w-5 h-5" /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Education Section ---
function EducationSection() {
  const { data: educations } = useEducations();
  
  return (
    <section id="education" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <SectionHeading title="Formação" subtitle="Minha trajetória acadêmica" number="05" />
          
          <div className="space-y-8 mt-12">
            {educations?.map((edu) => (
               <div key={edu.id} className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-8 last:border-0">
                 <div>
                   <h4 className="text-xl font-bold text-foreground">{edu.institution}</h4>
                   <p className="text-primary font-mono text-sm mt-1">{edu.degree}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Certifications Section ---
function CertificationsSection() {
  const { data: certifications, isLoading } = useCertifications();

  if (isLoading) return null;

  return (
    <section id="certifications" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Certificações" subtitle="Reconhecimento profissional" number="06" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {certifications?.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-secondary/30 border border-white/5 p-6 rounded-lg hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <Award className="w-8 h-8 mb-4 text-primary" />
              <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{cert.name}</h4>
              <p className="text-sm text-muted-foreground font-mono">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground/60 mt-2">{cert.date}</p>
              {cert.credentialId && (
                <p className="text-xs font-mono text-primary/70 mt-4 break-all">ID: {cert.credentialId}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact Section ---
function ContactSection() {
  const { data: profile } = useProfile();
  const { mutate: sendMessage, isPending } = useContact();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof insertContactSchema>>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: z.infer<typeof insertContactSchema>) => {
    sendMessage(data, {
      onSuccess: () => {
        toast({
          title: "Mensagem enviada!",
          description: "Responderei o mais breve possível.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <section id="contact" className="py-32 text-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <p className="font-mono text-primary mb-4">07. E agora?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Entre em Contato</h2>
        <p className="text-muted-foreground text-lg mb-12">
          Estou aberto a novas oportunidades. Seja uma dúvida ou apenas um olá,
          farei o possível para te responder!
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left mb-12 bg-secondary/20 p-8 rounded-lg border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="João Silva" {...field} className="bg-background/50 border-white/10 focus:border-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="joao@exemplo.com" {...field} className="bg-background/50 border-white/10 focus:border-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Mensagem</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Olá! Gostaria de conversar sobre um projeto..." 
                      className="min-h-[150px] bg-background/50 border-white/10 focus:border-primary"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full font-mono py-6 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isPending}
            >
              {isPending ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </Form>
        
        {profile && (
          <div className="flex justify-center space-x-8 mt-12">
             {profile.githubUrl && (
               <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200">
                 <Github className="w-6 h-6" />
               </a>
             )}
             {profile.linkedinUrl && (
               <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200">
                 <Linkedin className="w-6 h-6" />
               </a>
             )}
             <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200">
               <Mail className="w-6 h-6" />
             </a>
             {profile.location && (
               <div className="flex items-center text-muted-foreground">
                 <MapPin className="w-4 h-4 mr-2" />
                 <span className="font-mono text-sm">{profile.location}</span>
               </div>
             )}
          </div>
        )}
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="py-8 text-center text-sm font-mono text-muted-foreground bg-background border-t border-white/5">
      <div className="container mx-auto">
        <p className="hover:text-primary transition-colors cursor-default">
          Desenvolvido por Thiago Bosco
        </p>
        <p className="mt-2 text-xs opacity-60">
          v2.0 · 2025
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30">
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
