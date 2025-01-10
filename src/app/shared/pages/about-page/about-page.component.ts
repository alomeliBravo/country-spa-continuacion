import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-about-page',
  standalone: false,
  templateUrl: './about-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AboutPageComponent { }
