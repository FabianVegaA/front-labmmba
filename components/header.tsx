import styles from "../styles/Home.module.css";
import Search from "./search";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <div>
          <img src="/labmmba.svg" alt="Logo" />
          <h1>LabMMBA</h1>
        </div>
      </a>
      <form>
        <Search />
      </form>
    </header>
  );
}
