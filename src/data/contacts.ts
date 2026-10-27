export type ContactIcon =
  | "telegram"
  | "github"
  | "mail"
  | "phone"
  | "linkedin";

export interface Contact {
  id: string;
  label: string;
  /** TODO: замените "#" на реальный контакт. */
  value: string;
  /** TODO: замените "#" на реальную ссылку. */
  href: string;
  icon: ContactIcon;
  note: string;
}

export const contacts: Contact[] = [
  {
    id: "telegram",
    label: "Telegram",
    value: "@Rusyfox",
    href: "https://t.me/Rusyfox",
    icon: "telegram",
    note: "Самый быстрый способ связаться",
  },
  {
    id: "github",
    label: "GitHub",
    value: "LokiSonOfOdin",
    href: "https://github.com/LokiSonOfOdin",
    icon: "github",
    note: "Исходный код проектов",
  },
  {
    id: "email",
    label: "Email",
    value: "mastertailie@gmail.com",
    href: "mailto:mastertailie@gmail.com",
    icon: "mail",
    note: "Ответ в течение дня",
  },
  {
    id: "phone",
    label: "Телефон",
    value: "+79991345803",
    href: "tel:+79991345803",
    icon: "phone",
    note: "Звонки и сообщения",
  },
];
