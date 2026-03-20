import { Component, input } from '@angular/core';

@Component({
  selector: 'app-link',
  imports: [],
  template: `
    <a
      class="text-primary-grey active:text-primary-green active:underline underline-offset-3 cursor-pointer select-none hover:text-primary-green"
      >{{ text() }}</a
    >
  `,
})
export class Link {
  text = input.required<string>();
}
