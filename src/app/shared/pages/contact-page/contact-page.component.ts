import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-contact-page',
  standalone: false,
  templateUrl: './contact-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ContactPageComponent { }
