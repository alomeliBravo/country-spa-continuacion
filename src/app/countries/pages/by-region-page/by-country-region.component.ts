import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

//*Se utiliza "type" cuando sabemos que nuestra información no se va a expandir
type Region = 'Africa' | 'America' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-country-region',
  templateUrl: './by-country-region.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService ) {}

  searchByRegion( region:Region ) {

    this.selectedRegion = region;

    this.countriesService.searchRegion( region )
    .subscribe( countries => {
      this.countries = countries
    });
  }
}
