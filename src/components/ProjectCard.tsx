import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Project } from "@/lib/schemas";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import Icon from "./Icon";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const { name, href, description, image, tags, links } = project;

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-border">
      <CardHeader className="p-0">
        {image && (
          <Link href={href || image} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <Image
              src={image}
              alt={name}
              width={500}
              height={300}
              className="h-40 w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-6">
        <CardTitle className="text-lg">{name}</CardTitle>
        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed">
          {description}
        </Markdown>
      </CardContent>
      <CardFooter className="flex h-full flex-col items-start justify-between gap-4 px-6 pb-6">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.toSorted().map((tag) => (
              <Badge
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium"
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-2">
            {links.toSorted().map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge className="flex gap-2 px-2.5 py-1 text-[10px] transition-all hover:scale-105">
                  <Icon name={link.icon} className="size-3" />
                  {link.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
