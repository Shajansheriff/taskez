import { PropsWithChildren, ReactElement } from "react";
import { SideNavBar } from "../components/SideNavBar";
import { TopNavBar } from "../components/TopNavBar";
import { AuthGuard } from "../guards/AuthGuard";

function Container({ children }: PropsWithChildren) {
  return <div className="flex h-full">{children}</div>;
}

function Main({ children }: PropsWithChildren) {
  return (
    <main className="h-full flex-grow flex flex-col overflow-x-hidden">
      {children}
    </main>
  );
}

function Content({ children }: PropsWithChildren) {
  return <div className="h-full flex-grow p-4 overflow-x-auto">{children}</div>;
}

export function AppLayout(page: ReactElement) {
  return (
    <AuthGuard>
      <Container>
        <SideNavBar />
        <Main>
          <TopNavBar />
          <Content>{page}</Content>
        </Main>
      </Container>
    </AuthGuard>
  );
}
