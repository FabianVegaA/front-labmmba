import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import useSWR from "swr";
import { Publication, search } from "../lib/search";
import ReactLoading from "react-loading";
import Header from "../components/header";
import Footer from "../components/footer";

function Publications({ results }: { results: Publication[] }) {
  return <ul>{results.map((pub) => <li> {pub.bib.abstract}</li>).concat()}</ul>;
}

function getPublications(query: string, source: string) {
  const { data, error } = useSWR(
    { query, source },
    async ({ query, source }: { query: string; source: string }) =>
      await search(query, source)
  );

  if (error) return <h1>Error</h1>;
  if (!data)
    return (
      <ReactLoading type={"spin"} color={"#3366FF"} height={667} width={375} />
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
      {getPublications(query, source)}
      <Footer />
    </div>
  );
}

export async function getServerSideProps(_: GetServerSideProps) {
  return {
    props: {},
  };
}
