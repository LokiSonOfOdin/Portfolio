import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={`page ${styles.wrapper}`}>
      <span className={styles.icon}>
        <Compass size={30} />
      </span>

      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Такой страницы не найдено</h2>
      <p className={styles.text}>
        Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную —
        там есть всё самое интересное.
      </p>

      <Link to="/" className={`btn ${styles.btn}`}>
        <ArrowLeft size={17} />
        На главную
      </Link>
    </div>
  );
}
