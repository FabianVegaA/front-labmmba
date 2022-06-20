import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import useSWR from "swr";
import { Publication, search } from "../lib/search";
import ReactLoading from "react-loading";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/Home.module.css";
import Image from "next/image";

function Publication({ pub }: { pub: Publication }) {
  return (
    <div>
      <a href={pub.pub_url} target="_blank">
        {pub.bib.title}
      </a>
      {pub.bib.abstract}
      <div>
        <p>
          Author:{" "}
          {pub.bib.author.length === 0 || pub.bib.author[0] === ""
            ? "Sorry, we couldn't find the author"
            : pub.bib.author}
        </p>
        <p> Year: {pub.bib.pub_year}</p>
      </div>
    </div>
  );
}
function Publications({ results }: { results: Publication[] }) {
  return (
    <div className={styles.publication}>
      {results.map((pub) => <Publication pub={pub} />).concat()}
    </div>
  );
}

function PageError({ error }: { error: any }) {
  console.log("Error: ", error);

  return (
    <main className={styles.error}>
      <div>
        <h1>Error</h1>
        <p>
          We are sorry, but it seems that the bacteria has escaped from our
          database.
        </p>
        <p>Maybe you should wear a mask.</p>
      </div>
      <Image src="/error.svg" width="250" height="250" />
    </main>
  );
}

function getPublications(query: string, source: string) {
  const { data, error } = useSWR(
    { query, source },
    async ({ query, source }: { query: string; source: string }) =>
      await search(query, source)
  );

  if (error) return <PageError error={error} />;
  if (!data)
    return (
      <div className={styles.load}>
        <ReactLoading
          type={"spokes"}
          color={"#009988"}
          height={200}
          width={200}
        />
        <p>This will take just a moment</p>
      </div>
    );
  const results: Publication[] = data.results;
  return (
    <div>
      <Publications results={results} />
    </div>
  );
}

export default function SearchResult() {
  const router = useRouter();

  const source = Array.isArray(router.query.source)
    ? router.query.source[0]
    : router.query.source;
  if (!source) return <h1>No source received</h1>;

  const query = Array.isArray(router.query.query)
    ? router.query.query[0]
    : router.query.query;
  if (!query) return <h1>No query received</h1>;
  if (query === "") return <h1>The query is empty</h1>;

  return (
    <div>
      <Header />
      <main className={styles.main}>{getPublications(query, source)}</main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(_: GetServerSideProps) {
  return {
    props: {},
  };
}
