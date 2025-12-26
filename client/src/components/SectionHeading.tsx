import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  number: string;
}

export function SectionHeading({ title, subtitle, number }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline gap-4 mb-2"
      >
        <span className="font-mono text-primary text-xl font-medium">{number}.</span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">{title}</h2>
        <div className="h-px bg-white/10 flex-grow ml-4 max-w-xs hidden md:block"></div>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-muted-foreground text-lg ml-0 md:ml-10 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
