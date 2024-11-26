import { signUp } from "@/api/sign-up";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpSchema = z.object({
  restaurantName: z.string().min(3),
  managerName: z.string().min(3),
  phone: z.string().min(7),
  email: z.string().email(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SignUpFormData>();

  const { mutateAsync } = useMutation({
    mutationFn: signUp,
  });

  const handleSignUp = async (data: any) => {
    try {
      console.log(data);
      await mutateAsync({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        phone: data.phone,
        email: data.email,
      });
      toast.success("Your account was created!", {
        action: {
          label: "Go to sign in",
          onClick: () => {
            navigate("/sign-in?email=" + data.email);
          },
        },
        duration: 5000,
      });
      reset();
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("Failed to sign up. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Create a free account</title>
      </Helmet>
      <div className="p-8">
        <Button asChild className="absolute top-8 right-8" variant="ghost">
          <Link to="/sign-in">Already have an account? Sign in</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibol text-2xl tracking-tighter">
              Create a free account
            </h1>
            <p className="text-muted-foreground text-sm">
              Be a partner and start tracking your orders
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                type="text"
                id="restaurantName"
                {...register("restaurantName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Manager Name</Label>
              <Input
                type="text"
                id="managerName"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input type="tel" id="phone" {...register("phone")} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Sign up
            </Button>

            <p className="px-6 text-center text-muted-foreground text-sm leading-relaxed">
              By signing up, you agree to our{" "}
              <Link className="underline underline-offset-1" to="/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="underline underline-offset-1" to="/privacy">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
