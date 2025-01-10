import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  //*Url de la api que vamos a consumir
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryyByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null))
      );
  }

  //*Metodo el cual recibe el termino que vamos a buscar
  //*Los observables son de la programación reactiva
  searchCapital( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError(  () => of([]) )
      );
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]))
      );
  }

  searchRegion( region: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]))
      );
  }


  //TODO: Investigar que son los observables, rxjs, suscripciones

}
