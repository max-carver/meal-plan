"use client";

import Link from "next/link";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { EB_Garamond } from "next/font/google";
import { Utensils } from "lucide-react";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className={`${garamond.className} text-3xl font-bold flex items-center gap-2`}
        >
          <Utensils className="size-7 " />
          NutriPlan
          <span className="text-primary">AI</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild size="lg">
            <Link href="/meal-planner">Create Your Plan</Link>
          </Button>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
