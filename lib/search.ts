export type Bibliography = {
  title: string;
  author: string[];
  pub_year: number;
  venue: string;
  abstract: string;
};

export type Publication = {
  container_type: "Publication";
  source: string;
  bib: Bibliography;
  filled: boolean;
  gsrank: number;
  author_id: string[];
  url_scholarbib: string;
  url_add_sclib: string;
  num_citations: number;
  citedby_url: string;
  url_related_articles: string;
  eprint_url: string;
};

export type SearchResult = {
  status: string;
  source: string;
  results: Publication[];
};

export async function getPublicationsResult(
  apiUrl: string
): Promise<SearchResult> {
  const response = await fetch(apiUrl);

  return await response.json().then((data) => ({
    status: data.status,
    source: data.source,
    results: data.results,
  }));
}

export async function search(
  query: string,
  source: string
): Promise<SearchResult> {
  const options = {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `http://localhost:3001/api/search_request/?query=${query}&source=${source}`,
    options
  ).then((res) => res.json());

  const id: string = response.id;

  if (!id)
    throw `Something has gone wrong, check source: ${source} and query: ${query}`;

  return getPublicationsResult(
    `http://localhost:3001/api/search_result/?id=${id}`
  );
}
