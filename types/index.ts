export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  created: string;
  edited: string;
  population: string | number;
  url: string;
  residents: string[];
  films: string[];
}

export interface SortBy {
  key: keyof Planet, order: string
};

export interface Options {
  search: string,
  sortBy: SortBy[],
  page: number,
}

export interface PlanetTableHeader {
  title: string;
  key: string;
}
export interface PlanetTableItem {
  number: string;
};