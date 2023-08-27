"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
import { TbCards } from "react-icons/tb";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="site-header">
      <nav className="main-nav">
        <Link href="/" className="logo">
          <TbCards className="logo__icon" />
          <h1 className="logo__title">EduCard</h1>
        </Link>
        <button
          className="main-nav__control"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar navegación" : "Abrir navegación"}
          onClick={handleToggleMenu}
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </button>
        <SignedIn>
          <Link href="/dashboard" className="link link--header">
            Mi EduCard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="main-nav__log-button link link--header">
              Iniciar Sesión
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="main-nav__log-button link link--header">
              Registrarse
            </button>
          </SignUpButton>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Header;
