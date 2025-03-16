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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

import { signUpSchema } from "@/lib/zod/authSchema";
import { signUpUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormError from "@/components/forms/FormError";
import FormSuccess from "@/components/forms/FormSuccess";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const res = await signUpUser(values);
    if (res.success) {
      setSuccess(res.message);
    } else {
      setError(res.message);
    }
    console.log(values);
  };

  return (
    <Form {...form}>
      <FormContainer
        title="Sign up"
        description="Create an account to continue"
        footer={
          <p className="text-sm text-muted-foreground">
            Already have an account?
            <Button variant="link" asChild size="sm" className="-ml-1.5">
              <Link href="/auth/sign-in">Sign in</Link>
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
          {error && <FormError text={error} className="-mb-1" />}
          {success && <FormSuccess text={success} className="-mb-1" />}

          <SubmitButton isLoading={form.formState.isSubmitting}>
            Sign up
          </SubmitButton>
        </form>
      </FormContainer>
    </Form>
  );
};

export default SignUpForm;
