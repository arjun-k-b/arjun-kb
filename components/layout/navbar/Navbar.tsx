import { getNavigation } from "@/lib/api/navigation";

import Logo from "./Logo";
import Navigation from "./Navigation";
import ContactButton from "./ContactButton";

export default async function Navbar() {
  const response = await getNavigation();

  if (!response.success) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        <Navigation items={response.data} />

        <ContactButton />
      </nav>
    </header>
  );
}