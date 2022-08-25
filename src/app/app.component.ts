import { Component, OnInit } from '@angular/core';
import {Rate, HttpGetService} from "./http-get.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpGetService]
})
export class AppComponent implements OnInit {
  title = 'AppComponent';

  rates: Rate | { usd:-1, eur:-1, uah:-1 };
  error: any;
  uah: Currency | {sell: 1; buy: 1};
  usd: Currency | {sell: -1; buy: -1};
  eur: Currency | {sell: -1; buy: -1};

  constructor(private httpGetService: HttpGetService) {
    this.rates = { usd:-1, eur:-1, uah:-1 }
    this.uah = {sell: 1, buy: 1};
    this.usd = {sell: -1, buy: -1};
    this.eur = {sell: -1, buy: -1};
  }

  ngOnInit(): void {
    this.rates = { usd:-1, eur:-1, uah:-1 }
    this.getCurrentRates();
  }

  clear() {
    this.rates = { usd:-1, eur:-1, uah:-1 };
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
    return {
        usd: 36.9,
        eur: 36.8
      }*/
    this.httpGetService.getCurUAH()
      .subscribe({
      next: (data: any) => {
        data.forEach((item: ratesOutput) => {
          if(item.ccy !== "USD" && item.ccy !== "EUR") { }
          else {
            let key = item.ccy.toLowerCase();
            // @ts-ignore
            this[key] = {buy: +item.buy, sell: +item.sale}
          }
        })
      },
      error: error => {
        this.error = error
      }});
  }

}
interface ratesOutput {
  ccy: string;
  base_ccy: string;
  buy: number;
  sale: number;
}

interface Currency {
  sell: number;
  buy: number;
}

