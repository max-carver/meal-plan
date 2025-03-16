"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import createClient from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";

import * as z from "zod";
import { signInSchema, signUpSchema } from "@/lib/zod/authSchema";

export const signInUser = async (values: z.infer<typeof signInSchema>) => {
  const supabase = await createClient();

  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: true, message: "Invalid fields" };
  }

  const { error } = await supabase.auth.signInWithPassword(
    validatedFields.data
  );

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
};

export const signUpUser = async (values: z.infer<typeof signUpSchema>) => {
  const supabase = await createClient();

  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: true, message: "Invalid fields" };
  }

  const { error } = await supabase.auth.signUp(validatedFields.data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Check your email for verification link",
  };
};

export async function verifyEmail(
  token_hash: string | null,
  type: EmailOtpType | null
) {
  if (!token_hash || !type) {
    redirect("/error");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/account");
}
