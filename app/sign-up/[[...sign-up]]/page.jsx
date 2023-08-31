import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  // TODO:
  // Link to tutorial page before sign-up.
  return (
    <section className="log-container">
      <SignUp redirectUrl="/dashboard" />
    </section>
  );
}
