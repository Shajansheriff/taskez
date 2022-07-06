import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../utils/trpc";
import { signupSchema } from "../schemas/signup";
import { z } from "zod";
import Image from "next/image";
import { Button, Input } from "../components/common";
import * as Tabs from "@radix-ui/react-tabs";

type FormValues = z.infer<typeof signupSchema>;

export default function LoginPage() {
  const signupMutation = trpc.useMutation(["auth.signup"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
  });
  return (
    <main className="container w-full mx-auto pt-32 lg:py-28 flex justify-end">
      <div className="w-full lg:w-[576px] rounded-[64px] p-12 border-2 border-gray">
        <Tabs.Root className="auth_tabs space-y-8" defaultValue="login">
          <Tabs.List className="space-x-6">
            <Tabs.Trigger className="text-2xl py-3" value="login">
              Login
            </Tabs.Trigger>
            <Tabs.Trigger className="text-2xl py-3" value="signup">
              Sign up
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="flex justify-center" value="login">
            <form
              onSubmit={handleSubmit((data) => signupMutation.mutate(data))}
              className="space-y-8 w-[80%] border-t-2 border-t-[rgba(64,145,223,0.12)] py-8"
            >
              <div className="space-y-2">
                <h6 className="text-[#1A3B58] text-xl">To continue</h6>
                <p className="text-xs text-[#999999]">
                  We need your Name & Password{" "}
                </p>
              </div>
              <Input type="email" placeholder="Email" {...register("email")} />
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <div className="flex items-center space-x-2">
                <input id="remember" type="checkbox" />
                <label
                  htmlFor="remember"
                  className="text-xs text-[rgba(26,59,88,0.61)]"
                >
                  Remember me
                </label>
              </div>
              <Button disabled={signupMutation.isLoading} type="submit">
                Login
              </Button>
            </form>
          </Tabs.Content>

          <Tabs.Content
            className="flex justify-center border-t-1 border-t-[rgba(64,145,223,0.12)]"
            value="signup"
          >
            <form
              onSubmit={handleSubmit((data) => signupMutation.mutate(data))}
              className="space-y-8 w-[80%] border-t-2 border-t-[rgba(64,145,223,0.12)] py-8"
            >
              <Input
                type="text"
                placeholder="Full Name"
                {...register("name")}
              />
              <Input type="email" placeholder="Email" {...register("email")} />
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />

              <Button disabled={signupMutation.isLoading} type="submit">
                Sign up
              </Button>
            </form>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </main>
  );
}
