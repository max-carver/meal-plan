import Link from "next/link";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import Logo from "@/components/Logo";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          {user ? (
            <Button size="sm" onClick={signOutUser}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button size="sm" asChild variant="ghost">
                <Link href="/auth">Sign In</Link>
              </Button>

              <Button
                asChild
                className="rounded-full  shadow-primary/50 hover:shadow-md transition-all duration-300"
              >
                <Link href="/meal-planner">Get Started</Link>
              </Button>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
