import type { MenuItem } from "@/data/menu";
import { MenuCard } from "./MenuCard";

export function MenuGrid({ items, onOpen }: { items: MenuItem[]; onOpen: (item: MenuItem) => void }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.id} className="pop" style={{ "--i": index } as React.CSSProperties}>
          <MenuCard item={item} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}
