import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-home-page',
  standalone: false,
  templateUrl: './homePage.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HomePageComponent { }
