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
import { Dispatch, SetStateAction, useState } from "react";
import FormBacterium from "../components/formBacterium";
import { BacteriaInfo } from "../lib/types";

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

function PageErrorPublication({ error, query }: { error: any; query: string }) {
  console.log("Error: ", error);

  return (
    <div className={styles.errorP}>
      <div>
        <h2>Publication (Error)</h2>
        <p>No {query} articles found</p>
      </div>
      <Image src="/libro-de-ciencia.png" width="100" height="100" />
    </div>
  );
}

function ListPublications(props: {
  query: string;
  source: string;
  state: boolean;
}) {
  const { query, source, state } = props;
  const [showFormBacterium, setShowFormBacterium] = useState(false);
  const [showFormPublication, setShowFormPublication] = useState(false);

  const { data, error } = useSWR(
    { query, source },
    async ({ query, source }: { query: string; source: string }) =>
      await searchPublications(query, source)
  );

  if (error) return <PageErrorPublication error={error} query={query} />;
  if (!data)
    if (state)
      return (
        <div className={styles.loadP}>
          <ReactLoading
            type={"balls"}
            color={"#009988"}
            height={"5%"}
            width={"5%"}
          />
          <p>This will take just a moment</p>
        </div>
      );
    else return <div></div>;
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
    <div className={styles.bacteriaInfo}>
      <h1>
        {bacteriaInfo.Name_and_taxonomic_classification.LPSN[
          "full scientific name"
        ]
          .replaceAll("<I>", "")
          .replaceAll("</I>", "")}
      </h1>
      <p>
        <b>Synonym: </b>
        {
          bacteriaInfo.Name_and_taxonomic_classification.LPSN.synonyms?.[
            "synonym"
          ]
        }
      </p>
      <p>
        <b>Description:</b> {bacteriaInfo.General.description}
      </p>
      <p>
        <b>Class:</b> {bacteriaInfo.Name_and_taxonomic_classification?.class}
      </p>
      <p>
        <b>Domain:</b> {bacteriaInfo.Name_and_taxonomic_classification.domain}
      </p>
      <p>
        <b>Phylum:</b> {bacteriaInfo.Name_and_taxonomic_classification.phylum}
      </p>
      <p>
        <b> Order:</b> {bacteriaInfo.Name_and_taxonomic_classification.order}
      </p>
      <p>
        <b>Family:</b> {bacteriaInfo.Name_and_taxonomic_classification.family}
      </p>
      <p>
        <b>Genus:</b> {bacteriaInfo.Name_and_taxonomic_classification.genus}
      </p>
      <p>
        <b>Species:</b> {bacteriaInfo.Name_and_taxonomic_classification.species}
      </p>
    </div>
  );
}

function BacteriaInfo(props: {
  query: string;
  setState: Dispatch<SetStateAction<boolean>>;
}) {
  const { query, setState } = props;

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

  setState(true);
  const bacteriaInfo: BacteriaInfo = data.data;

  return <Bacteria bacteriaInfo={bacteriaInfo} />;
}

export default function SearchResult() {
  const router = useRouter();

  const [showLoadingPublications, setShowLoadingPublications] = useState(false);

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
        <BacteriaInfo query={query} setState={setShowLoadingPublications} />
        <ListPublications
          query={query}
          source={"scholar"}
          state={showLoadingPublications}
        />
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
