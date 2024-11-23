import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>();

  const handleSignIn = async (data: any) => {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("A magic link has been sent to your email", {
        action: {
          label: "Resend",
          onClick: () => {
            handleSignIn(data);
          },
        },
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Failed to send magic link. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="p-8">
        <Button asChild className="absolute top-8 right-8" variant="ghost">
          <Link to="/sign-up">New to pizza.shop? Sign up</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibol text-2xl tracking-tighter">
              Access to the Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Track your orders through the partner dashboard
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" {...register("email")} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
