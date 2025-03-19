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
import FormContainer from "./FormContainer";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

import { signInSchema } from "@/lib/zod/authSchema";
import { signInUser } from "@/actions/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    await signInUser(values);
  };

  return (
    <Form {...form}>
      <FormContainer
        title="Sign in"
        description="Welcome Back"
        footer={
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?
            <Button variant="link" asChild size="sm" className="-ml-1.5">
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </p>
        }
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                    <div className="absolute right-3 top-3">
                      {showPassword ? (
                        <EyeIcon
                          size={16}
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <EyeOffIcon
                          size={16}
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton isLoading={form.formState.isSubmitting}>
            Sign in
          </SubmitButton>
        </form>
      </FormContainer>
    </Form>
  );
};

export default SignInForm;
