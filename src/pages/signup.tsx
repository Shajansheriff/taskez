import * as Avatar from "@radix-ui/react-avatar";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { LoginForm } from "../components/Auth/LoginForm";
import { SignupForm } from "../components/Auth/SignupForm";
import { GuestGuard } from "../guards/GuestGuard";
import { PlainLayout } from "../layouts/PlainLayout";

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  return (
    <GuestGuard>
      <main className="container mx-auto h-full pt-12 lg:pt-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-items-center">
          <Avatar.Root className="hidden md:flex justify-center items-center w-96 h-96">
            <Avatar.AvatarImage
              className="w-full h-full object-contain"
              src="/images/login-banner.png"
            />
          </Avatar.Root>
          <div className="w-full lg:w-[576px] shrink-0 rounded-[64px] p-8 lg:p-14 border-2 border-gray">
            <Tabs.Root
              className="auth_tabs space-y-8"
              defaultValue={tab}
              value={tab}
              onValueChange={setTab}
            >
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
                <SignupForm onSuccess={() => setTab("login")} />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </main>
    </GuestGuard>
  );
}

LoginPage.getLayout = PlainLayout;
