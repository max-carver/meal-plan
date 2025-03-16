"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

const SubmitButton = ({
  children,
  disabled,
  isLoading,
  variant,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      variant={variant}
      className={cn("mt-4 w-full", className)}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin mr-2" />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
