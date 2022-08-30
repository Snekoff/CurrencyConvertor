import { Component } from '@angular/core';
import {Currency} from "./content/content.component"



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'AppComponent';
  usd: Currency = {sell: -1, buy: -1};
  eur: Currency = {sell: -1, buy: -1};

  constructor() {
  }

  addCurrencyUsd(newCurrency: Currency) {
    this.usd = newCurrency;
  }

  addCurrencyEur(newCurrency: Currency) {
    this.eur = newCurrency;
  }

}


