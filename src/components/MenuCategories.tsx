type Option = { id: string; label: string };

type Props = {
  options: Option[];
  active: string;
  onChange: (id: string) => void;
};

// Переключатель категорий. На телефоне листается по горизонтали, а не переносится в несколько строк.
export function MenuCategories({ options, active, onChange }: Props) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((option) => {
        const isActive = option.id === active;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={`h-11 shrink-0 snap-start rounded-full border px-5 text-[15px] font-semibold transition active:scale-[0.97] ${
              isActive
                ? "border-coffee bg-coffee text-milk"
                : "border-line bg-white/60 text-coffee-soft hover:border-coffee/40 hover:bg-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
