import { Link } from "wouter";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export default function ToolCard({ title, description, icon: Icon, href }: ToolCardProps) {
  return (
    <Link href={href}>
      <article className="tool-card p-6 cursor-pointer group h-full hover:-translate-y-0.5 transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
