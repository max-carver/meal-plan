import { createClient } from "@/lib/supabase/server";

const ProfilePage = async () => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const session = await supabase.auth.getSession();

  return (
    <div>
      <h1>Session:</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1>User:</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
