import { EB_Garamond } from "next/font/google";
import { Utensils } from "lucide-react";
import Link from "next/link";
import React from "react";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const Logo = ({
  textSize = "text-3xl",
  iconSize = "size-7",
  hasIcon = true,
}: {
  textSize?: string;
  iconSize?: string;
  hasIcon?: boolean;
}) => {
  return (
    <Link
      href="/"
      className={`${garamond.className} ${textSize} font-bold flex items-center gap-2`}
    >
      {hasIcon && <Utensils className={iconSize} />}
      NutriPlan
      <span className="text-primary">AI</span>
    </Link>
  );
};

export default Logo;
