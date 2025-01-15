import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  //*Url de la api que vamos a consumir
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) { }

  private getCountriesRequest( url:string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
        // delay( 1000 ) //Operador de RXJS para agregar un delay "delay(ms)".
      )
  }

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

  //*Tap es un operador de RXJS el cuál se utiliza para ejecutar efectos secundarios
  //*En un flujo de datos sin modificar, los datos que pasan a través de ese flujo.

  //*Es útil es Depuración, registro de logs, disparar efectos secundarios como actualizar variables externas

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries })
      );
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountry = { term,countries })
      );
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region,countries } )
      );
  }


  //TODO: Investigar que son los observables, rxjs, suscripciones

}
