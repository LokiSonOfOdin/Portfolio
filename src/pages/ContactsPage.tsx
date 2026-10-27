import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import type { ComponentType } from "react";
import { GithubIcon, LinkedinIcon } from "../components/icons/BrandIcons";
import { contacts } from "../data/contacts";
import type { ContactIcon } from "../data/contacts";
import styles from "./ContactsPage.module.css";

const iconMap: Record<ContactIcon, ComponentType<{ size?: number }>> = {
  telegram: MessageCircle,
  github: GithubIcon,
  mail: Mail,
  phone: Phone,
  linkedin: LinkedinIcon,
};

const telegram = contacts.find((contact) => contact.id === "telegram");

export default function ContactsPage() {
  return (
    <div className="page">
      <header className={styles.header}>
        <span className={styles.badge}>
          <Send size={14} />
          Всегда на связи
        </span>

        <h1 className={styles.title}>
          Мои <span className="gradientText">контакты</span>
        </h1>

        <p className={styles.lead}>
          Выберите удобный способ связи — отвечаю быстро и по делу. Пишите по
          любым вопросам: новые проекты, сотрудничество или просто
          познакомиться.
        </p>
      </header>

      <div className={styles.layout}>
        <section className={styles.contacts} aria-label="Список контактов">
          {contacts.map((contact) => {
            const Icon = iconMap[contact.icon];

            return (
              <a
                key={contact.id}
                href={contact.href}
                className={styles.contact}
              >
                <span className={styles.contactIcon}>
                  <Icon size={19} />
                </span>

                <span className={styles.contactBody}>
                  <span className={styles.contactLabel}>{contact.label}</span>
                  {/* TODO: замените "#" на реальный контакт в src/data/contacts.ts */}
                  <span className={styles.contactValue}>{contact.value}</span>
                  <span className={styles.contactNote}>{contact.note}</span>
                </span>
              </a>
            );
          })}
        </section>

        <aside className={styles.aside}>
          <div className={styles.statusCard}>
            <div className={styles.signal} aria-hidden="true">
              <span className={styles.ring} />
              <span className={styles.ring} />
              <span className={styles.ring} />
              <span className={styles.core} />
            </div>

            <span className={styles.statusBadge}>
              <span className={styles.statusDot} />
              Открыт к проектам
            </span>

            <h2 className={styles.asideTitle}>Отвечаю в течение дня</h2>
            <p className={styles.asideText}>
              Опишите задачу коротко: что нужно сделать, какие сроки и примеры
              того, что вам нравится. Этого достаточно, чтобы начать разговор.
            </p>

            <a
              className={styles.telegramBtn}
              href={telegram?.href ?? "#"}
              target="_blank"
              rel="noreferrer"
            >
              <Send size={16} />
              Написать в Telegram
            </a>
            <p className={styles.asideHint}>
              Обычно отвечаю в течение пары часов
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
