import React from "react";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

export type IconName = string;

interface DynamicIconProps extends LucideProps {
  name: IconName;
  fallback?: React.ComponentType<LucideProps>;
}

export default function DynamicIcon({
  name,
  fallback: Fallback = Icons.Sparkles,
  ...props
}: DynamicIconProps) {
  if (!name) return <Fallback {...props} />;
  
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[formattedName] ||
    (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name] ||
    Fallback;

  return <IconComponent {...props} />;
}
