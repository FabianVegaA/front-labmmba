export type SearchResultBacteria = {
  status: String;
  id: string;
  data: BacteriaInfo;
};

export type BacteriaInfo = {
  General: General;
  Name_and_taxonomic_classification: Name_and_taxonomic_classification;
  "Physiology and metabolism": PhysiologyAndMetabolism;
};

export type General = {
  keywords: string;
  description: string;
};

type Name_and_taxonomic_classification = {
  LPSN: LPSN;
  domain: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
};

type LPSN = {
  description: string;
  keyword: string;
  domain: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  "full scientific name": string;
  synonyms: {
    synonym: string;
  };
};

type PhysiologyAndMetabolism = {
  metaboliteUtilization: [
    {
      metabolite: string;
      utilizationActivity: string;
      kindOfUtilizationTested: string;
    }
  ];
};
