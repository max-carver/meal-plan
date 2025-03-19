"use server";

import * as z from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authSchema } from "@/lib/zod/authSchema";

export const signInUser = async (values: z.infer<typeof authSchema>) => {
  console.log(values);
};

export const signUpUser = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    console.error(error);
    return {
      error: true,
      message: error.message,
    };
  }
};

export const signOutUser = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
};
