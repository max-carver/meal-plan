import Container from "@/components/Container";
import SignUpForm from "@/components/forms/SignUpForm";

const SignInPage = () => {
  return (
    <Container className="flex h-[calc(100vh-70px)] items-center justify-center">
      <SignUpForm />
    </Container>
  );
};

export default SignInPage;
