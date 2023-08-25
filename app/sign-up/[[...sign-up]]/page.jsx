import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="log-container">
      <SignUp redirectUrl="/dashboard" />
    </section>
  );
}
