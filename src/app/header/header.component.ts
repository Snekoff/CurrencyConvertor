import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // must be widget
  // functional programming style

  constructor() { }

  ngOnInit(): void {
  }

  @Input() usd = -1;
  @Input() eur = -1;

}
