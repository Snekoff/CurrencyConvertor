import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Rate {
  usd: number;
  eur: number;
  uah: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpGetService {
  urlUAH: string;

  constructor(private http: HttpClient) {
    this.http = http;
    this.urlUAH = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
  }

  getCurUAH() {

    const options = {
      method: 'GET' as const,
      redirect: "follow",
      headers: {
        'apikey': '1a09afZKT282AcZFYeuhqM71QZJ05ogo' as const,
      }
    }

    let outUAH = this.http.get<Rate>(this.urlUAH/*, options*/);
    console.log(outUAH);
    return outUAH
  }


}
