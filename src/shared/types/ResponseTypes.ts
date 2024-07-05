interface BaseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CombinedType;
}

interface CommonResultResponse {
  name: string;
  url: string;
}

interface SpeciesResponse extends CommonResultResponse {
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  language: string;
  skin_colors: string;
}

interface StarshipsResponse extends CommonResultResponse {
  starship_class: string;
  length: string;
  consumables: string;
  cost_in_credits: string;
  manufacturer: string;
}

interface PlanetsResponse extends CommonResultResponse {
  climate: string;
  diameter: string;
  gravity: string;
  population: string;
  terrain: string;
}

type CategoriesType = 'planets' | 'species' | 'starships';

type CombinedType = SpeciesResponse[] | StarshipsResponse[] | PlanetsResponse[];

export {
  type BaseResponse,
  type SpeciesResponse,
  type CategoriesType,
  type CombinedType,
  type StarshipsResponse,
  type PlanetsResponse,
};
