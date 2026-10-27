import { FolderGit2, Rocket } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import styles from "./ProjectsPage.module.css";

function plural(count: number, one: string, few: string, many: string) {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

export default function ProjectsPage() {
  const readyCount = projects.filter((item) => item.status === "ready").length;
  const projectsWord = plural(projects.length, "проект", "проекта", "проектов");
  const readyWord = plural(readyCount, "готов", "готовы", "готовы");

  return (
    <div className="page">
      <header className={styles.header}>
        <span className={styles.badge}>
          <FolderGit2 size={14} />
          {projects.length} {projectsWord} · {readyCount} {readyWord} к запуску
        </span>

        <h1 className={styles.title}>
          Мои <span className="gradientText">проекты</span>
        </h1>

        <p className={styles.lead}>
          Здесь собраны работы, которые я сделал как самостоятельный
          разработчик. Готовые проекты можно открыть и протестировать прямо на
          сайте.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <section className={styles.note}>
        <span className={styles.noteIcon}>
          <Rocket size={20} />
        </span>
        <div>
          <h2 className={styles.noteTitle}>Хотите посмотреть ещё?</h2>
          <p className={styles.noteText}>
            Часть проектов ещё в работе — они появятся здесь позже. Загляните в
            раздел «Контакты», чтобы обсудить задачу.
          </p>
        </div>
      </section>
    </div>
  );
}
