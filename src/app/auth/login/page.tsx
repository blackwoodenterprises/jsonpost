import { Suspense } from "react";
import { LoadingPage } from "@/components/ui/loading";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingPage title="Loading sign in..." />}>
      <LoginForm />
    </Suspense>
  );
}
