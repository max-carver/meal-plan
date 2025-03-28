import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FormContainer = ({
  children,
  title,
  description,
  footer,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 items-center justify-center">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default FormContainer;
