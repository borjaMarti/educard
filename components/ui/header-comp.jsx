"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
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

  if (location === "/study") {
    navClass = "site-header__nav--study";
    headerClass = "site-header--in";
  }

  return (
    <header className={`site-header ${headerClass}`}>
      <nav className={`site-header__nav ${navClass}`}>
        <Link href="/" className="logo">
          <TbCards className="logo__icon" />
          <h1 className="logo__title">EduCard</h1>
        </Link>
        <SignedIn>
          {location !== "/study" && <UserButton afterSignOutUrl="/" />}
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="site-header__link">Iniciar Sesión</button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Header;
