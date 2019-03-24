export interface RawCarShows {
  make: string;
  model: string;
  name: string;
}


export interface CarShows {
  make: string;
  cars: ModelShows[];
}

interface ModelShows {
  model: string;
  shows: string[];
}
