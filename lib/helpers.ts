import { Currencies } from "./currencies";

export function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

export function GetFormatterForCurrency(currency: string) {
  // Mapear "R$" para "BRL" e garantir que o código de moeda seja válido
  const validCurrency = currency === "R$" ? "BRL" : currency;

  const locale =
    Currencies.find((c) => c.value === validCurrency)?.locale || "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: validCurrency,
  });
}
