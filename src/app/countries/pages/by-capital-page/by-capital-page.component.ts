import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false; //Empieza como falso
  public initialValue: string = '';

  constructor( private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }


  //!Aunque estemos llamando al observable, si no nos suscribimos este
  //!no va a mandar nada
  searchByCapital( term: string ):void {

    this.isLoading =  true; //Una vez se hace la busqueda se activa

    this.countriesService.searchCapital( term )
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false; //Se oculta una vez obtiene los valores
    });
  }

}
