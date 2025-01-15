import { Country } from "./country"
import { Region } from "./region.type"

export interface CacheStore {
  byCapital: TermCountries,
  byCountry: TermCountries,
  byRegion: RegionCountries,
}

//*Cuando tenemos interfaces en las cuales tenemos que definir otro
//*Objeto interno, es mejor crear otra interfaz
export interface TermCountries {
  term: string,
  countries: Country[]
}

export interface RegionCountries {
  region: Region,
  countries: Country[]
}
