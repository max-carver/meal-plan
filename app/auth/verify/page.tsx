import { verifyEmail } from "@/actions/auth";
import { EmailOtpType } from "@supabase/supabase-js";

// This page does not have any UI, it is used to verify the email address
// and redirect to the account page.
// Could have used a route handler instead but fuck it gotta stay organized

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash: string; type: EmailOtpType }>;
}) {
  const params = await searchParams;
  const token_hash = params.token_hash;
  await verifyEmail(token_hash, params.type);

  return <div>{token_hash}</div>;
}
