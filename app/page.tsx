import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to NoteHub</h1>
        <p className={styles.description}>
          NoteHub is your personal space to create, manage, and organize your
          notes.
        </p>
      </div>
    </section>
  );
}
