import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class Content implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input() usd = {sell: -1, buy: -1};
  @Input() eur = {sell: -1, buy: -1};
  @Input() uah = {sell: -1, buy: -1};
  title = 'CurrencyConversion';
  currenciesNames = ["uah", "usd", "eur"];

  onChange(isFirst: boolean) {
    let first = document.querySelector("#firstCurrencyInput");
    let second = document.querySelector("#secondCurrencyInput");
    let firstSel = document.querySelector("#firstCurrencySelect");
    let secondSel = document.querySelector("#secondCurrencySelect");
    if (!first || !second || !firstSel || !secondSel) return -1;

    if (isFirst) return this.onChangeFirst(first, second, firstSel, secondSel);
    return this.onChangeSecond(first, second, firstSel, secondSel);
  }

  onChangeFirst(first: Element, second: Element, firstSel: Element, secondSel: Element) {
    // @ts-ignore
    let firstIndex = this.findIndex(firstSel.value);
    // @ts-ignore
    let secondIndex = this.findIndex(secondSel.value);
    // @ts-ignore
    this.onChangeFirstSetSecond(first.value, firstIndex, secondIndex);
    return 0;
  }

  onChangeFirstSetSecond(value: number, selectedTypeIndexFirst: number, selectedTypeIndexSecond: number) {

    let second = document.querySelector("#secondCurrencyInput");
    if (!second) return -1;
    let var1Name: string = this.currenciesNames[selectedTypeIndexFirst];
    let var2Name: string = this.currenciesNames[selectedTypeIndexSecond];
    // @ts-ignore
    let mul: number = this[var1Name].buy / this[var2Name].sell;
    // @ts-ignore
    second.value = Math.round(value * mul * 1000) / 1000;
    return 0;
  }

  onChangeSecond(first: Element, second: Element, firstSel: Element, secondSel: Element) {

    if (!first || !second || !firstSel || !secondSel) return -1;
    // @ts-ignore
    let firstIndex = this.findIndex(firstSel.value);
    // @ts-ignore
    let secondIndex = this.findIndex(secondSel.value);
    // @ts-ignore
    this.onChangeSecondSetFirst(second.value, secondIndex, firstIndex);
    return 0;
  }

  onChangeSecondSetFirst(value: number, selectedTypeIndexFirst: number, selectedTypeIndexSecond: number) {
    console.log("currencies");
    console.log("uah", this.uah);
    console.log("usd", this.usd);
    console.log("eur", this.eur);

    let second = document.querySelector("#firstCurrencyInput");
    if (!second) return -1;
    let var1Name: string = this.currenciesNames[selectedTypeIndexFirst];
    let var2Name: string = this.currenciesNames[selectedTypeIndexSecond];
    // @ts-ignore
    let mul: number = this[var1Name].sell / this[var2Name].buy;
    // @ts-ignore
    second.value = Math.round(value * mul * 1000) / 1000;
    return 0;
  }

  findIndex(nameOfCurrency: string) {
    if (nameOfCurrency.length < 0 || nameOfCurrency.length > 3) return -1;
    return this.currenciesNames.indexOf(nameOfCurrency);
  }
}
