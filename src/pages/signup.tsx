import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../utils/trpc";
import { signupSchema } from "../schemas/signup";
import { z } from "zod";
import Image from "next/image";
import { Input } from "../components/common";

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
    <main className="container mx-auto pt-32">
      <div className="grid relative grid-cols-1 lg:grid-cols-2">
        <div className="w-full relative">
          <Image
            src={"/images/login-banner.png"}
            alt="login banner image"
            layout="fill"
            className="w-full"
          />
        </div>
        <div>
          <div className="rounded-[64px] border-2 border-gray">
            <h4>Login</h4>
            <form
              onSubmit={handleSubmit((data) => signupMutation.mutate(data))}
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
              <button disabled={signupMutation.isLoading} type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
