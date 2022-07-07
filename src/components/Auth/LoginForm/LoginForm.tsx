import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ROUTES } from "../../../routes";
import { LoginFormValues, loginSchema } from "../../../schemas/login";
import { Button, Input } from "../../common";
import { Form } from "../BaseForm";

export function LoginForm() {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    shouldUseNativeValidation: true,
  });

  const onSubmit = async (payload: LoginFormValues) => {
    try {
      const response = await signIn("credentials", {
        ...payload,
        redirect: false,
      });
      if (response?.ok) {
        const url = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;
        return router.push(url ?? ROUTES.app.root);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <h6 className="text-[#1A3B58] text-xl">To continue</h6>
        <p className="text-xs text-[#999999]">We need your Name & Password </p>
      </div>
      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
        error={errors.password?.message}
      />
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="remember" {...register("remember")} />
        <label
          htmlFor="remember"
          className="block text-xs text-[rgba(26,59,88,0.61)]"
        >
          Remember me
        </label>
      </div>

      <Button type="submit">Login</Button>
    </Form>
  );
}
