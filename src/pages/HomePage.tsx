import { Link } from "react-router-dom";
import {
  Accessibility,
  ArrowRight,
  FolderGit2,
  Gauge,
  Layers,
  MessageCircle,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Photo from "../components/Photo";
import styles from "./HomePage.module.css";

const stack = [
  "React 19",
  "TypeScript",
  "Vite",
  "React Router",
  "CSS Modules",
  "HTML5 & CSS3",
  "JavaScript",
  "Node.js",
  "REST API",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "Web Workers",
  "Адаптивная вёрстка",
  "WebP / AVIF",
];

const skills = [
  {
    icon: Zap,
    title: "Быстрые интерфейсы",
    text: "Оптимизирую рендеринг, ленивую загрузку и размер бандла, чтобы приложение открывалось мгновенно.",
  },
  {
    icon: Palette,
    title: "Продуманный дизайн",
    text: "Собираю аккуратные интерфейсы с продуманной типографикой, состояниями и тёмной и светлой темами.",
  },
  {
    icon: Layers,
    title: "Чистый код",
    text: "Дроблю проекты на переиспользуемые компоненты, типизирую данные и пишу понятную документацию.",
  },
  {
    icon: Accessibility,
    title: "Доступность",
    text: "Уделяю внимание семантической разметке, фокусу с клавиатуры и адаптивности на всех экранах.",
  },
  {
    icon: Server,
    title: "Бэкенд на Node.js",
    text: "Пишу серверную часть на Node.js: проектирую REST API, работаю с PostgreSQL и MongoDB.",
  },
];

const stats = [
  { value: "3+", label: "года опыта" },
  { value: "40+", label: "завершённых проектов" },
  { value: "100%", label: "любовь к деталям" },
  { value: "∞", label: "кофе выпито" },
];

export default function HomePage() {
  return (
    <div className="page">
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.badge}>
            <Sparkles size={14} />
            Открыт к новым проектам
          </span>

          <h1 className={styles.title}>
            Привет! Я <span className="gradientText">фронтенд-разработчик</span>
            <br />
            и пишу <span className="gradientText">бэкенд на Node.js</span>
          </h1>

          <p className={styles.lead}>
            Разрабатываю быстрые и аккуратные веб-приложения на React и
            TypeScript, а серверную часть — на Node.js. Работаю с REST API и
            базами данных PostgreSQL и MongoDB. Люблю чистую архитектуру,
            продуманные детали интерфейса и задачи, где performance и дизайн
            идут рука об руку.
          </p>

          <div className={styles.heroActions}>
            <Link to="/projects" className={`btn ${styles.btnPrimary}`}>
              Смотреть проекты
              <ArrowRight size={17} />
            </Link>
            <Link to="/contacts" className={`btn ${styles.btnGhost}`}>
              <MessageCircle size={17} />
              Связаться со мной
            </Link>
          </div>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Обо мне ---------- */}
      <section className="section" id="about">
        <h2 className="sectionTitle">
          <ShieldCheck size={24} />
          Обо мне
        </h2>
        <p className="sectionLead">
          Уже несколько лет я перевожу дизайн-макеты в живой код и довожу
          проекты до релиза.
        </p>

        <div className={styles.about}>
          <div className={styles.aboutPhoto}>
            <Photo className={styles.aboutPhotoImg} />
          </div>

          <div className={styles.aboutText}>
            <p>
              Меня зовут <strong>Ганиев Рустем</strong>, я фронтенд-разработчик.
              Начинал с вёрстки и постепенно пришёл к полноценной разработке на
              React и TypeScript.
            </p>
            <p>
              Мне нравится работать там, где есть пространство для решения
              инженерных задач: ускорение рендеринга, сложные интерфейсные
              состояния, интеграции с API. Помимо фронтенда пишу серверную
              часть на Node.js, проектирую REST API и работаю с PostgreSQL и
              MongoDB.
            </p>
            <p>
              В свободное время собираю собственные проекты, чтобы
              экспериментировать с технологиями. Один из таких — конвертер
              изображений, он есть в разделе «Проекты».
            </p>

            <ul className={styles.facts}>
              <li>
                <Rocket size={16} />
                Ориентируюсь на результат и сроки
              </li>
              <li>
                <Server size={16} />
                Пишу API на Node.js
              </li>
              <li>
                <Gauge size={16} />
                Слежу за производительностью и доступностью
              </li>
              <li>
                <FolderGit2 size={16} />
                Веду проекты в Git и документирую решения
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Стек ---------- */}
      <section className="section">
        <h2 className="sectionTitle">
          <Layers size={24} />
          Стек и навыки
        </h2>
        <p className="sectionLead">
          Инструменты, с которыми работаю каждый день.
        </p>

        <div className={styles.stack}>
          {stack.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- Что умею ---------- */}
      <section className="section">
        <h2 className="sectionTitle">
          <Sparkles size={24} />
          Что я умею
        </h2>
        <p className="sectionLead">
          Четыре принципа, по которым я подхожу к любому интерфейсу.
        </p>

        <div className={styles.skills}>
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <article key={skill.title} className={styles.skill}>
                <span className={styles.skillIcon}>
                  <Icon size={20} />
                </span>
                <h3 className={styles.skillTitle}>{skill.title}</h3>
                <p className={styles.skillText}>{skill.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className={`section ${styles.cta}`}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            Давайте сотрудничать
          </h2>
          <p className={styles.ctaText}>
            Ищете разработчика для фронтенда или бэкенда? Напишите мне —
            отвечу быстро и честно.
          </p>
          <Link to="/contacts" className={`btn ${styles.btnPrimary}`}>
            <MessageCircle size={17} />
            Оставить контакт
          </Link>
        </div>
      </section>
    </div>
  );
}
