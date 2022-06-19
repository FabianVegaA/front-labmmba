import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import useSWR from "swr";
import { Publication, search } from "../lib/search";
import ReactLoading from "react-loading";
import Header from "../components/header";
import Footer from "../components/footer";

function Publications({ results }: { results: Publication[] }) {
  return <ul>{results.map((pub) => <li> {pub.bib.title}</li>).concat()}</ul>;
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
      <ReactLoading type={"balls"} color={"#3366FF"} height={667} width={375} />
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

  const source = router.query.source;
  if (!source) return <h1>No source received</h1>;

  const query = router.query.query;
  if (!query) return <h1>No query received</h1>;
  if (query === "") return <h1>The query is empty</h1>;

  return (
    <div>
      <Header />
      {getPublications("h1n1", "scholar")}
      <Footer />
    </div>
  );
}

export async function getServerSideProps(_: GetServerSideProps) {
  return {
    props: {},
  };
}
