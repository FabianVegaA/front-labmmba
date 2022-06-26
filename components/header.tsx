import styles from "../styles/Home.module.css";
import Search from "./search";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <div>
            <Image src="/labmmba.svg" alt="Logo" height={45} width={45} />
            <h1>LabMMBA</h1>
          </div>
        </a>
      </Link>

      <form>
        <Search />
      </form>
    </header>
  );
}
