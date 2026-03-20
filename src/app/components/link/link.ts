import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="linkTo()"
      class="text-primary-grey active:text-primary-green active:underline underline-offset-3 cursor-pointer select-none hover:text-primary-green"
      >{{ text() }}</a
    >
  `,
})
export class Link {
  text = input.required<string>();
  linkTo = input.required<string>();
}
