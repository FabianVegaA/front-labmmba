import Head from "next/head";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer.jsx";
import Search from "../components/search";

function SearchBig() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to labMMBA.</h1>
      <Search />
    </main>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <SearchBig />
      <Footer />
    </div>
  );
}
