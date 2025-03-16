"use client";

import SubmitButton from "@/components/forms/SubmitButton";
import { useForm } from "react-hook-form";

import createClient from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";

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

import { accountSchema } from "@/lib/zod/authSchema";
import { useEffect, useCallback, useState } from "react";

const AccountForm = ({ user }: { user: User | null }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, user?.id]);

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: user?.email,
      fullName: user?.user_metadata.full_name,
      username: user?.user_metadata.username,
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <FormContainer title="Your account" description="Manage your account">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton isLoading={form.formState.isSubmitting}>
            Update account
          </SubmitButton>
        </form>
      </FormContainer>
    </Form>
  );
};

export default AccountForm;
