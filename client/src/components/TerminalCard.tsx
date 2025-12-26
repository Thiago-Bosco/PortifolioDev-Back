import { motion } from "framer-motion";

interface TerminalCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function TerminalCard({ children, title = "bash", className = "" }: TerminalCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`terminal-window ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-[#30363D]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="text-xs text-muted-foreground font-mono">{title}</div>
        <div className="w-12"></div>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
