import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {CurrencyService, Rate} from "../currency.service";

export interface Currency {
  sell: number;
  buy: number;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class Content implements OnInit {

  title = 'Content';
  currenciesNames = ["uah", "usd", "eur"];

  @Output() uahChange = new EventEmitter<Currency>;
  @Output() usdChange = new EventEmitter<Currency>;
  @Output() eurChange = new EventEmitter<Currency>;

  error: any;
  uah: Currency = {sell: 1, buy: 1};
  usd: Currency = {sell: -1, buy: -1};
  eur: Currency = {sell: -1, buy: -1};

  @ViewChild('firstCurrencyInput') firstCurrencyInput: any;
  @ViewChild('secondCurrencyInput') secondCurrencyInput: any;
  @ViewChild('firstCurrencySelect') firstCurrencySelect: any;
  @ViewChild('secondCurrencySelect') secondCurrencySelect: any;

  constructor(private httpGetService: CurrencyService) {
  }

  ngOnInit(): void {
    this.getCurrentRates();
  }

  clear() {
    this.error = undefined;
    this.uahChange = new EventEmitter<Currency>;
    this.usdChange = new EventEmitter<Currency>;
    this.eurChange = new EventEmitter<Currency>;
  }

  addUah() {
    this.uahChange.emit(this.uah);
  }

  addUsd() {
    this.usdChange.emit(this.usd);
  }

  addEur() {
    this.eurChange.emit(this.eur);
  }

  getCurrentRates() {
    this.httpGetService.getCurrencyUAH()
      .subscribe({
        next: (data: Array<Rate>) => {
          data.forEach((item: Rate) => {
            if (item.ccy === "USD") {
              this.usd = {buy: +item.buy, sell: +item.sale};
            } else if (item.ccy === "EUR") {
              this.eur = {buy: +item.buy, sell: +item.sale};
            }
          })
          this.addUah();
          this.addUsd();
          this.addEur();
        },
        error: error => {
          this.error = error
        }
      });
  }

  onChange = (isFirst: boolean) => {
    if (!this.firstCurrencyInput || !this.secondCurrencyInput || !this.firstCurrencySelect || !this.secondCurrencySelect) return -1;

    if (isFirst) return this.onChangeFirst();
    return this.onChangeSecond();
  }

  onChangeFirst() {
    let firstIndex = this.findIndex(this.firstCurrencySelect.selected);
    let secondIndex = this.findIndex(this.secondCurrencySelect.selected);

    this.onChangeFirstSetSecond(+this.firstCurrencyInput.value, firstIndex, secondIndex);
    return 0;
  }

  onChangeFirstSetSecond(value: number, selectedTypeIndexFirst: number, selectedTypeIndexSecond: number) {
    let currencyValues = [this.uah, this.usd, this.eur];
    // for usd or eur currencies must calculate modifier because it is easier than make get requests for each separately
    let mul = currencyValues[selectedTypeIndexFirst].buy / currencyValues[selectedTypeIndexSecond].sell;
    // uah
    if (selectedTypeIndexSecond === 0) mul = currencyValues[selectedTypeIndexFirst].buy

    this.secondCurrencyInput.value = Math.round(value * mul * 1000) / 1000;
    return 0;
  }

  onChangeSecond() {
    let firstIndex = this.findIndex(this.firstCurrencySelect.selected);
    let secondIndex = this.findIndex(this.secondCurrencySelect.selected);

    this.onChangeSecondSetFirst(+this.secondCurrencyInput.value, firstIndex, secondIndex);
    return 0;
  }

  onChangeSecondSetFirst(value: number, selectedTypeIndexFirst: number, selectedTypeIndexSecond: number) {
    let currencyValues = [this.uah, this.usd, this.eur];
    // for usd or eur currencies must calculate modifier because it is easier than make get requests for each separately
    let mul: number = currencyValues[selectedTypeIndexSecond].sell / currencyValues[selectedTypeIndexFirst].buy;
    this.firstCurrencyInput.value = Math.round(value * mul * 1000) / 1000;
    return 0;
  }

  findIndex(nameOfCurrency: string) {
    if (nameOfCurrency.length < 0 || nameOfCurrency.length > 3) return -1;
    return this.currenciesNames.indexOf(nameOfCurrency);
  }
}
