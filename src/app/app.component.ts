import { Component, OnInit } from '@angular/core';
import {Rate, CurrencyService} from "./currency.service";

interface Currency {
  sell: number;
  buy: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'AppComponent';


  error: any;
  uah: Currency = {sell: 1, buy: 1};
  usd: Currency = {sell: -1, buy: -1};
  eur: Currency = {sell: -1, buy: -1};

  constructor(private httpGetService: CurrencyService) {
  }

  ngOnInit(): void {
    this.getCurrentRates();
  }

  clear() {
    this.error = undefined;
    this.uah = {sell: 1, buy: 1};
    this.usd = {sell: -1, buy: -1};
    this.eur = {sell: -1, buy: -1};
  }

  getCurrentRates() {
    // TODO remove it
    /*this.uah = {sell: 1, buy: 1};
    this.usd = {sell: 39.5, buy: 39.9};
    this.eur = {sell: 40, buy: 41};
    return 0*/
    this.httpGetService.getCurrencyUAH()
      .subscribe({
      next: (data: Array<Rate>) => {
        data.forEach((item: Rate) => {
          if(item.ccy === "USD" || item.ccy === "EUR") {
            let key = item.ccy.toLowerCase();
            // @ts-ignore
            this[key] = {buy: +item.buy, sell: +item.sale};
          }
        })
      },
      error: error => {
        this.error = error
      }});
  }

}


