"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { TbCards } from "react-icons/tb";

const Header = () => {
  const pathname = usePathname();
  const firstPartIndex = pathname.indexOf("/", 1);
  const location = pathname.slice(
    0,
    firstPartIndex === -1 ? pathname.length : firstPartIndex,
  );
  let headerClass = "";
  let navClass = "";

  if (location === "/dashboard") {
    navClass = "site-header__nav--dashboard";
    headerClass = "site-header--in";
  }

  if (
    location === "/study" ||
    location === "/sign-in" ||
    location === "/sign-up"
  ) {
    navClass = "site-header__nav--study";
    headerClass = "site-header--in";
  }

  return (
    <header className={`site-header ${headerClass}`} id="head">
      <nav className={`site-header__nav ${navClass}`}>
        <Link href="/" className="logo">
          <TbCards className="logo__icon" />
          <h1 className="logo__title">EduCard</h1>
        </Link>
        <SignedIn>
          {location !== "/study" && <UserButton afterSignOutUrl="/" />}
        </SignedIn>
        <SignedOut>
          {location !== "/sign-in" &&
            location !== "/sign-up" &&
            location !== "/tos" &&
            location !== "/privacy" && (
              <SignInButton>
                <button className="site-header__link">Iniciar Sesión</button>
              </SignInButton>
            )}
          {(location === "/tos" || location === "/privacy") && (
            <SignUpButton>
              <button className="site-header__link site-header__link--sign-up">
                Registrarse
              </button>
            </SignUpButton>
          )}
        </SignedOut>
      </nav>
    </header>
  );
};

export default Header;
