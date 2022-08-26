import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Rate {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  urlUAH: string = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getCurrencyUAH(): Observable<Array<Rate>> {
    return this.http.get<Array<Rate>>(this.urlUAH);
  }


}
