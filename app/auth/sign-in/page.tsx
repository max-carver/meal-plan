import Container from "@/components/Container";
import SignInForm from "@/components/forms/SignInForm";

const SignInPage = () => {
  return (
    <Container className=" h-[calc(100vh-70px)] flex items-center justify-center">
      <SignInForm />
    </Container>
  );
};

export default SignInPage;
