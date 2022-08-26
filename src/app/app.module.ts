import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Content } from './content/content.component';
import { CurrencyService } from "./currency.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Content
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
