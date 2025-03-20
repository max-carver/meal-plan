"use client";

import FormContainer from "@/components/forms/FormContainer";

import { Utensils } from "lucide-react";
import { EB_Garamond } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { doGoogleAuth } from "@/actions/auth";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const SignUpForm = () => {
  const authWithGoogle = async () => {
    await doGoogleAuth();
  };

  return (
    <FormContainer
      title={
        <>
          <Utensils className="size-12" />
          <h2 className={`text-3xl font-semibold ${garamond.className}`}>
            Welcome to NutriPlan <span className="text-primary">AI</span>
          </h2>
        </>
      }
    >
      {/* <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground text-lg -mt-1">
            or
          </span>
        </div>
      </div> */}

      <Button
        type="button"
        onClick={authWithGoogle}
        className="flex items-center gap-2 rounded-full w-full mt-0"
        variant="outline"
      >
        <Image
          src="/google-icon.svg"
          alt="Google Icon"
          width={23}
          height={23}
          className="rounded-full"
        />
        Sign in with Google
      </Button>
    </FormContainer>
  );
};

export default SignUpForm;
