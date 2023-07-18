import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <h1>EduCard</h1>
      <SignedIn>
        <Link href="/dashboard">Dashboard</Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" redirectUrl="/dashboard">
          <button>Iniciar Sesión</button>
        </SignInButton>
        <SignUpButton mode="modal" redirectUrl="/dashboard">
          <button>Registrarse</button>
        </SignUpButton>
      </SignedOut>
    </header>
  );
};

export default Header;
