import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

export function SignIn() {
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibol text-2xl tracking-tighter">
              Access to the Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Track your orders through the partner dashboard
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" />
            </div>

            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
