import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {CurrencyService, Rate} from "../currency.service";
import {first} from "rxjs";
import {InputClearableComponent} from "./input-clearable/input-clearable.component"
import {SelectOverviewComponent} from "./select-overview/select-overview.component"

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

  @Output() uahChange = new EventEmitter<Currency>;// = {sell: 1, buy: 1};
  @Output() usdChange = new EventEmitter<Currency>;// = {sell: -1, buy: -1};
  @Output() eurChange = new EventEmitter<Currency>;// = {sell: -1, buy: -1};

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
    // TODO remove it
    this.uah = {sell: 1, buy: 1};
    this.usd = {buy: 39.4, sell: 39.9};
    this.eur = {buy: 39.5, sell: 40.1};
    this.addUah();
    this.addUsd();
    this.addEur();
    return 0
    this.httpGetService.getCurrencyUAH()
      .subscribe({
        next: (data: Array<Rate>) => {
          data.forEach((item: Rate) => {
            if(item.ccy === "USD") {
              this.usd = {buy: +item.buy, sell: +item.sale};
            } else if(item.ccy === "EUR") {
              this.eur = {buy: +item.buy, sell: +item.sale};
            }
          })
          this.addUah();
          this.addUsd();
          this.addEur();
        },
        error: error => {
          this.error = error
        }});
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
    if (!this.secondCurrencyInput) return -1;
    let var1Name: string = this.currenciesNames[selectedTypeIndexFirst];
    let var2Name: string = this.currenciesNames[selectedTypeIndexSecond];
    // @ts-ignore
    let mul = this[var1Name].buy / this[var2Name].sell;
    // @ts-ignore
    if (var2Name === "uah") mul = this[var1Name].sell
    this.secondCurrencyInput.value = Math.round(value * mul * 1000) / 1000;
    return 0;
  }

  onChangeSecond() {

    if (!this.firstCurrencyInput || !this.secondCurrencyInput || !this.firstCurrencySelect || !this.secondCurrencySelect) return -1;
    let firstIndex = this.findIndex(this.firstCurrencySelect.selected);
    let secondIndex = this.findIndex(this.secondCurrencySelect.selected);
    this.onChangeSecondSetFirst(+this.secondCurrencyInput.value, secondIndex, firstIndex);
    return 0;
  }

  onChangeSecondSetFirst(value: number, selectedTypeIndexFirst: number, selectedTypeIndexSecond: number) {
    if (!this.firstCurrencyInput) return -1;
    let var1Name: string = this.currenciesNames[selectedTypeIndexFirst];
    let var2Name: string = this.currenciesNames[selectedTypeIndexSecond];
    // @ts-ignore
    let mul: number = this[var1Name].sell / this[var2Name].buy;
    this.firstCurrencyInput.value = Math.round(value * mul * 1000) / 1000;
    return 0;
  }

  findIndex(nameOfCurrency: string) {
    if (nameOfCurrency.length < 0 || nameOfCurrency.length > 3) return -1;
    return this.currenciesNames.indexOf(nameOfCurrency);
  }
}
