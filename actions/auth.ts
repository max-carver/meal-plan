"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const doGoogleAuth = async () => {
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
