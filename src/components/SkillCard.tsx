import { cn } from "@/lib/utils";
import Image from "next/image";

interface SkillCardProps {
  name: string;
  description: string;
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SkillCard({
  name,
  description,
  icon,
  className,
  style,
}: SkillCardProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-border hover:-translate-y-0.5 backdrop-blur-sm",
        className,
      )}
      style={style}
    >
      <div className="relative size-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={icon}
          alt={name}
          fill
          className="rounded-md object-contain"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-foreground">
          {name}
        </span>
        <span className="text-xs text-muted-foreground leading-relaxed">{description}</span>
      </div>
    </div>
  );
}
