import type { MenuItem } from "@/data/menu";
import { MenuCard } from "./MenuCard";

export function MenuGrid({ items }: { items: MenuItem[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <MenuCard item={item} />
        </li>
      ))}
    </ul>
  );
}
