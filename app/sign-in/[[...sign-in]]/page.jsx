import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="log-container">
      <SignIn redirectUrl="/dashboard" />
    </section>
  );
}
