export const Currencies = [
  { value: "BRL", label: "R$ Real", locale: "pt-BR" },
  { value: "USD", label: "US$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "GBP", label: "£ Pound", locale: "en-GB" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
];

export type Currency = (typeof Currencies)[0];
