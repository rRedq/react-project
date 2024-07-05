interface BaseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RacesResponse[];
}

interface CommonResultResponse {
  name: string;
  url: string;
}

interface RacesResponse extends CommonResultResponse {
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  language: string;
  skin_colors: string;
}

type CategoriesType = 'planets' | 'species' | 'starships';

export { type BaseResponse, type RacesResponse, type CategoriesType };
