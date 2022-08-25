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
  uah: Currency | {sell: -1; buy: -1};
  usd: Currency | {sell: -1; buy: -1};
  eur: Currency | {sell: -1; buy: -1};

  constructor(private httpGetService: HttpGetService) {
    this.rates = { usd:-1, eur:-1, uah:-1 }
    this.uah = {sell: -1, buy: -1};
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
    this.uah = {sell: -1, buy: -1};
    this.usd = {sell: -1, buy: -1};
    this.eur = {sell: -1, buy: -1};
  }

  getCurrentRates() {
    // TODO remove it
    /*return  this.currency = {
        usd: 36.9,
        eur: 36.8
      }*/
    this.httpGetService.getCurUAH()
      .subscribe({
      next: (data: any) => {
        this.rates = {
          usd: Math.round(1 / data.rates.USD * 1000) / 1000,
          eur: Math.round(1 / data.rates.EUR * 1000) / 1000,
          uah: Math.round(1 / data.rates.UAH * 1000) / 1000,
        }
        this.uah = {sell: 1, buy: this.rates.uah}
      },
      error: error => {
        this.error = error
      }});

    this.httpGetService.getCurUSD()
      .subscribe({
        next: (data: any) => this.usd = {
          sell: Math.round( data.rates.USD * 1000) / 1000,
          buy: this.rates.usd
        },
        error: error => {
          this.error = error
        }});

    this.httpGetService.getCurEUR()
      .subscribe({
        next: (data: any) => this.eur = {
          sell: Math.round( data.rates.EUR * 1000) / 1000,
          buy: this.rates.eur
        },
        error: error => {
          this.error = error
        }});
  }

}

interface Currency {
  sell: number;
  buy: number;
}

