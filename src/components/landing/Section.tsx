import { type ElementType, type ReactNode } from "react";

type SectionProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

export default function Section({
  as: Tag = "section",
  id,
  className = "",
  innerClassName = "",
  children,
}: SectionProps) {
  return (
    <Tag id={id} className={`w-full ${className}`}>
      <div
        className={`mx-auto w-full max-w-[1240px] px-6 ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
