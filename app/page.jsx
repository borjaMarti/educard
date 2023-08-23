import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const HomePage = async () => {
  return (
    <>
      <h1>Welcome to Educard!</h1>
      <SignedOut>
        <SignInButton mode="modal" redirectUrl="/dashboard">
          <button>Iniciar Sesión</button>
        </SignInButton>
        <SignUpButton mode="modal" redirectUrl="/dashboard">
          <button>Registrarse</button>
        </SignUpButton>
      </SignedOut>
    </>
  );
};

export default HomePage;
