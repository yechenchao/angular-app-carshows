export interface PristineCar {
  make: string;
  model: string;
}

export interface RawCarShow {
  make: string;
  model: string;
  name: string;
}

export interface RawModelShows {
  model: string;
  name: string;
}

export interface CarShows {
  make: string;
  cars: ModelShows[];
}

export interface ModelShows {
  model: string;
  shows: string[];
}
