import Image from "next/image";

interface AuthorBioProps {
  name: string;
  title: string;
}

export function AuthorBio({ name, title }: AuthorBioProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-6">
      <Image
        src="/brand/synq-icon.png"
        alt={name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div>
        <p className="font-medium text-foreground">{name}</p>
        {title && <p className="text-sm text-muted-foreground">{title}</p>}
      </div>
    </div>
  );
}
