import styles from "../styles/Home.module.css";
import Footer from "../components/footer.jsx";
import Search from "../components/search.jsx";

type old = {
  name: string;
  date: number;
};

type article = {
  title: string;
  description: string;
  link: string;
};

type bacterium = {
  name: string;
  taxonomy: {
    id: number;
    rank: number;
  };
  genome: {
    size: number;
    n50: number;
    genes: number;
  };
  old: old[];
  articles: article[];
};

const bacterium = {
  name: "Janthinobacterium lividum",
  taxonomy: {
    id: 2345,
    rank: 8323,
  },
  genome: {
    size: 6.4,
    n50: 6.4,
    genes: 5023,
  },
  old_names: [
    {
      name: "H1",
      date: 1978,
    },
    {
      name: "N1",
      date: 1990,
    },
  ],
  articles: [
    {
      title:
        "Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo.",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat...",
      link: "http://localhost:3000",
    },
    {
      title:
        "Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo.",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat...",
      link: "http://localhost:3000",
    },
    {
      title:
        "Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo.",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat...",
      link: "http://localhost:3000",
    },
  ],
};

function Old({ olds }: { olds: old[] }) {
  return (
    <>
      {olds
        .map((old) => (
          <p>
            {old.name}: {old.date}
          </p>
        ))
        .concat()}
    </>
  );
}

function Article({ articles }: { articles: article[] }) {
  return (
    <>
      {articles
        .map((article) => (
          <div>
            <a href={article.link}>
              <h4>{article.title}</h4>
            </a>
            <p>{article.description}</p>
          </div>
        ))
        .concat()}
    </>
  );
}

function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <div>
          <img src="/vercel.svg" alt="Logo" />
          <h1>LabMMBA</h1>
        </div>
      </a>
      <form>
        <Search />
      </form>
    </header>
  );
}

function Main() {
  return (
    <main className={styles.main}>
      <h2>{bacterium.name}</h2>
      <div>
        <h3>Taxonomy</h3>
        <p>NCBI Taxonomy ID: {bacterium.taxonomy.id}</p>
        <p>Taxonomy rank: species</p>
        <h3>Genome</h3>
        <p>Genome size: {bacterium.genome.size} Mb</p>
        <p>Contig N50: {bacterium.genome.n50} Mb</p>
        <p>Genes: {bacterium.genome.genes}</p>
        <h3>Old Names</h3>
        <Old olds={bacterium.old_names} />
        <hr></hr>
        <Article articles={bacterium.articles} />
      </div>
    </main>
  );
}

export default function Bacterium() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
