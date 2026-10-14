const rub = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

// 1250 → «1 250 ₽» (с неразрывными пробелами, чтобы цена не переносилась)
export const formatPrice = (value: number) => rub.format(value);
