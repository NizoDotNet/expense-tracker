import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: 'link.html',
})
export class Link {
  text = input.required<string>();
  linkTo = input.required<string>();
}
