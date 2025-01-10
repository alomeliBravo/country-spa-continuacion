import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-region',
  templateUrl: './by-country-region.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService ) {}

  searchByRegion( region:string ) {
    this.countriesService.searchRegion( region )
    .subscribe( countries => {
      this.countries = countries
    });
  }
}
