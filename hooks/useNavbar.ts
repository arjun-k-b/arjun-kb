"use client";

import { useState } from "react";

export function useNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return {
    isMobileMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
}