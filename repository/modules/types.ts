import { Planet } from "~/types";

export interface IPlanetResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: Planet[]
}