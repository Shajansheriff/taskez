import * as Tabs from "@radix-ui/react-tabs";
import { LoginForm } from "../components/Auth/LoginForm";
import { SignupForm } from "../components/Auth/SignupForm";
import { GuestGuard } from "../guards/GuestGuard";

export default function LoginPage() {
  return (
    <GuestGuard>
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
              <LoginForm />
            </Tabs.Content>
            <Tabs.Content className="flex justify-center" value="signup">
              <SignupForm />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </main>
    </GuestGuard>
  );
}
