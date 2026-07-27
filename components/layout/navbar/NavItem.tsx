import Link from "next/link";
import type { NavigationItem } from "@/types/navigation";

interface NavItemProps {
  item: NavigationItem;
}

export default function NavItem({ item }: NavItemProps) {
  return (
    <li>
      <Link
        href={item.href}
        className="text-gray-300 transition-colors duration-300 hover:text-white"
      >
        {item.label}
      </Link>
    </li>
  );
}