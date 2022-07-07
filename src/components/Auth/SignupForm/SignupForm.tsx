import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupFormValues, signupSchema } from "../../../schemas/signup";
import { trpc } from "../../../utils/trpc";
import { Button, Input } from "../../common";
import { Form } from "../BaseForm";

export function SignupForm() {
  const mutation = trpc.useMutation(["auth.signup"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    shouldUseNativeValidation: true,
  });

  return (
    <Form onSubmit={handleSubmit((payload) => mutation.mutate(payload))}>
      <Input
        type="text"
        placeholder="Full Name"
        {...register("name")}
        error={errors.name?.message}
      />
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

      <Button disabled={mutation.isLoading} type="submit">
        Sign up
      </Button>
    </Form>
  );
}
