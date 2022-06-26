import styles from "../styles/Home.module.css";
import Image from "next/image";

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://gitlab.inf.utfsm.cl/rromero/inf225-labmmba"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Los increativos</span> <Image src="/labmmba.svg" alt="Logo" width={40} height={40}/>
      </a>
    </footer>
  );
}

export default Footer;