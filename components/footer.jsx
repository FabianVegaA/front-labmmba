import styles from "../styles/Home.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://gitlab.inf.utfsm.cl/rromero/inf225-labmmba"
        target="_blank"
        rel="noopener noreferrer"
      >
        Los increativos <img src="/vercel.svg" alt="Logo" />
      </a>
    </footer>
  );
}

export default Footer;