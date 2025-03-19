"use client";

import SubmitButton from "@/components/forms/SubmitButton";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormContainer from "@/components/forms/FormContainer";
import { useState } from "react";

import { signUpUser } from "@/actions/auth";
import FormError from "@/components/forms/FormError";
import FormSuccess from "@/components/forms/FormSuccess";
import { authSchema } from "@/lib/zod/authSchema";
import { Utensils } from "lucide-react";
import { EB_Garamond } from "next/font/google";
import Image from "next/image";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const authWithGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setSuccess(undefined);

    await signUpUser();
  };

  const magicLinkAuth = async (values: z.infer<typeof authSchema>) => {
    console.log(values);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(magicLinkAuth)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <FormError text={error} />}
          {success && <FormSuccess text={success} />}

          <SubmitButton
            isLoading={form.formState.isSubmitting}
            className="mb-1"
          >
            Sign in with email
          </SubmitButton>
        </form>
      </Form>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground text-lg -mt-1">
            or
          </span>
        </div>
      </div>

      <form onSubmit={authWithGoogle} className="flex flex-col gap-2">
        <SubmitButton
          className="flex items-center gap-2 rounded-full mt-0"
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
        </SubmitButton>
        <SubmitButton
          className="flex items-center gap-2 rounded-full mt-0"
          variant="outline"
        >
          <Image
            src="/google-icon.svg"
            alt="Google Icon"
            width={23}
            height={23}
            className="rounded-full"
          />
          Other OAuth
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default SignUpForm;
