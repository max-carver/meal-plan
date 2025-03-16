import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

const FormSuccess = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  if (!text) null;
  return (
    <div
      className={cn(
        "bg-success/20 border border-success/50 rounded-sm text-success p-2 py-1 flex items-center gap-2",
        className
      )}
    >
      <CircleCheck className="size-5" />
      <span>{text}</span>
    </div>
  );
};

export default FormSuccess;
