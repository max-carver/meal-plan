import Container from "@/components/Container";
import AccountForm from "@/components/forms/AccountForm";
import createClient from "@/lib/supabase/server";

const AccountPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <Container className="flex items-center h-screen">
      <div className="w-full max-w-md mx-auto">
        <AccountForm user={user} />
      </div>
    </Container>
  );
};

export default AccountPage;
