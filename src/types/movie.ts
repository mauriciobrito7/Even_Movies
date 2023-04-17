export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieOptions {
  language?: 'en-US' | 'es-ES';
  sortBy?: {
    key: 'primary_release_date' | 'popularity' | 'vote_average';
    order: 'asc' | 'desc';
  }[];
  releaseDate?: {
    from: string;
    to: string;
  };
  minVoteCount?: number;
}

export interface ICharacter {
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
