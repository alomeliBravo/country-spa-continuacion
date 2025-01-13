import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {

  //Recibe el texto dependiendo de la página donde se encuentre
  @Input()
  public placeholder:string = '';

}
