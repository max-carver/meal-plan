import { cn } from "@/lib/utils";
import { ShieldX } from "lucide-react";

const FormError = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  if (!text) return null;
  return (
    <div
      className={cn(
        "bg-destructive/20 border border-destructive/50 rounded-sm text-destructive p-2 py-1 flex items-center gap-2",
        className
      )}
    >
      <ShieldX className="size-5" />
      <span>{text}</span>
    </div>
  );
};

export default FormError;
