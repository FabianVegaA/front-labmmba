import Head from "next/head";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer.jsx";
import Search from "../components/search";

function SearchBig() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to labMMBA.</h1>
        <Search />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/labmmba.svg" />
      </Head>
      <SearchBig />
      <Footer />
    </div>
  );
}
