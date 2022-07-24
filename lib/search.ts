import { SearchResultBacteria } from "./types";

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
  pub_url: string;
};

type SearchResultPublications = {
  status: string;
  source: string;
  results: Publication[];
};

export type SearchResult = {
  publications: SearchResultPublications;
  bacteriaInfo: SearchResultBacteria;
};

export async function search(
  query: string,
  source: string
): Promise<SearchResult> {
  const defaultSearchPublication: SearchResultPublications = {
    status: "OK",
    source: "default",
    results: [],
  };

  const bacteriaInfo = await searchBacteria(query);

  console.log(bacteriaInfo);

  return {
    publications: defaultSearchPublication,
    bacteriaInfo: bacteriaInfo,
  };
}

export async function getPublicationsResult(
  apiUrl: string
): Promise<SearchResultPublications> {
  const response = await fetch(apiUrl);

  return await response.json().then((data) => ({
    status: data.status,
    source: data.source,
    results: data.results,
  }));
}

export async function searchPublications(
  query: string,
  source: string
): Promise<SearchResultPublications> {
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

export async function getBacteriaResult(
  apiUrl: string
): Promise<SearchResultBacteria> {
  const response = await fetch(apiUrl);

  return await response.json().then((data) => ({
    status: data.status,
    id: data.id,
    data: {
      General: data.data.General,
      Name_and_taxonomic_classification:
        data.data["Name and taxonomic classification"],
      "Physiology and metabolism": data.data["Physiology and metabolism"],
    },
  }));
}

export async function searchBacteria(
  query: string
): Promise<SearchResultBacteria> {
  const options = {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `http://localhost:3001/api/search_request_bacteria/?query=${query}`,
    options
  ).then((res) => res.json());

  const id: string = response.id;

  return getBacteriaResult(
    `http://localhost:3001/api/search_result_bacteria/?id=${id}`
  );
}
