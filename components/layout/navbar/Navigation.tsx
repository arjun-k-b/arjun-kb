import NavItem from "./NavItem";
import type { NavigationItem } from "@/types/navigation";

interface NavigationProps {
  items: NavigationItem[];
}

export default function Navigation({ items }: NavigationProps) {
  return (
    <ul className="flex items-center gap-8">
      {items.map((item) => (
        <NavItem key={item.id} item={item} />
      ))}
    </ul>
  );
}