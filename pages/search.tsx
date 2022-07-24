import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import useSWR from "swr";
import {
  Publication,
  search,
  searchBacteria,
  searchPublications,
} from "../lib/search";
import ReactLoading from "react-loading";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import FormPublication from "../components/formPublication";
import { useEffect, useState } from "react";
import FormBacterium from "../components/formBacterium";
import { BacteriaInfo, General } from "../lib/types";

const handleClick = (e: any) => {
  if (e === "Bacteria") {
    alert(e);
  } else if (e === "Publication") {
    alert(e);
  } else {
    var sure = confirm("Are you sure?");
    if (sure === true) {
      alert("Delete " + e);
    }
  }
};

function Publication({ pub }: { pub: Publication }) {
  return (
    <div>
      <a href={pub.pub_url} target="_blank">
        {pub.bib.title}
      </a>
      {pub.bib.abstract}
      <div>
        <div>
          <p>
            Author:{" "}
            {pub.bib.author.length === 0 || pub.bib.author[0] === ""
              ? "Sorry, we couldn't find the author"
              : pub.bib.author}
          </p>
          <p> Year: {pub.bib.pub_year}</p>
        </div>
        <button
          className={styles.button}
          onClick={() => handleClick(pub.bib.title)}
        >
          Delete
        </button>
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
        <p>It seems that the bacteria has escaped from our database.</p>
        <p>Maybe you should wear a mask.</p>
      </div>
      <Image src="/error.svg" width="250" height="250" />
    </main>
  );
}

function ListPublications({
  query,
  source,
}: {
  query: string;
  source: string;
}) {
  const [showFormBacterium, setShowFormBacterium] = useState(false);
  const [showFormPublication, setShowFormPublication] = useState(false);

  const { data, error } = useSWR(
    { query, source },
    async ({ query, source }: { query: string; source: string }) =>
      await searchPublications(query, source)
  );

  if (error) return <PageError error={error} />;
  if (!data)
    return (
      <div className={styles.load}>
        <ReactLoading
          type={"spokes"}
          color={"#009988"}
          height={"50%"}
          width={"50%"}
        />
        <p>This will take just a moment</p>
      </div>
    );
  const publications: Publication[] = data.results;

  return (
    <div>
      {showFormBacterium ? (
        <FormBacterium setState={setShowFormBacterium} />
      ) : null}
      {showFormPublication ? (
        <FormPublication setState={setShowFormPublication} />
      ) : null}
      <h2>{query}</h2>
      <div className={styles.add}>
        <input type="checkbox" />
        <span>+</span>
        <ul>
          <li>
            <button onClick={() => setShowFormBacterium(true)}>Bacteria</button>
          </li>
          <li>
            <button onClick={() => setShowFormPublication(true)}>
              Publication
            </button>
          </li>
        </ul>
      </div>
      <Publications results={publications} />
    </div>
  );
}

function Bacteria({ bacteriaInfo }: { bacteriaInfo: BacteriaInfo }) {
  return (
    <p>
      <b>Full scientific name: </b>
      {bacteriaInfo.Name_and_taxonomic_classification.LPSN[
        "full scientific name"
      ]
        .replaceAll("<I>", "")
        .replaceAll("</I>", "")}
      <br />
      <b>Synonym: </b>
      {bacteriaInfo.Name_and_taxonomic_classification.LPSN.synonyms?.["synonym"]}
      <br />
      <b>Description:</b> {bacteriaInfo.General.description}
      <br />
      <b>Class:</b> {bacteriaInfo.Name_and_taxonomic_classification?.class}
      <br />
      <b>Domain:</b> {bacteriaInfo.Name_and_taxonomic_classification.domain}
      <br />
      <b>Phylum:</b> {bacteriaInfo.Name_and_taxonomic_classification.phylum}
      <br />
      <b> Order:</b> {bacteriaInfo.Name_and_taxonomic_classification.order}
      <br />
      <b>Family:</b> {bacteriaInfo.Name_and_taxonomic_classification.family}
      <br />
      <b>Genus:</b> {bacteriaInfo.Name_and_taxonomic_classification.genus}
      <br />
      <b>Species:</b> {bacteriaInfo.Name_and_taxonomic_classification.species}
      <br />
    </p>
  );
}

function BacteriaInfo({ query }: { query: string }) {
  const { data, error } = useSWR(
    { query },
    async ({ query }: { query: string }) => await searchBacteria(query)
  );

  if (error) return <PageError error={error} />;
  if (!data)
    return (
      <div className={styles.load}>
        <ReactLoading
          type={"spokes"}
          color={"#009988"}
          height={"50%"}
          width={"50%"}
        />
        <p>This will take just a moment</p>
      </div>
    );
  const bacteriaInfo: BacteriaInfo = data.data;

  return <Bacteria bacteriaInfo={bacteriaInfo} />;
}

export default function SearchResult() {
  const router = useRouter();

  // const source = Array.isArray(router.query.source)
  //   ? router.query.source[0]
  //   : router.query.source;
  // if (!source) return <h1>No source received</h1>;

  const query = Array.isArray(router.query.query)
    ? router.query.query[0]
    : router.query.query;
  if (!query) return <h1>No query received</h1>;
  if (query === "") return <h1>The query is empty</h1>;

  return (
    <div>
      <Head>
        <title>{query}</title>
        <link rel="icon" href="/labmmba.svg" />
      </Head>
      <Header />
      <main className={styles.main}>
        <BacteriaInfo query={query} />
        <ListPublications query={query} source={"scholar"} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(_: GetServerSideProps) {
  return {
    props: {},
  };
}
