import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-overview',
  templateUrl: './select-overview.component.html',
  styleUrls: ['./select-overview.component.css']
})
export class SelectOverviewComponent {
  @Input() func : any;
  selected: string = "usd"

  currencies: Array<string> = [
    'uah',
    'usd',
    'eur'
  ]


}
