import {Component, Input} from '@angular/core';


@Component({
  selector: 'input-clearable-example',
  templateUrl: './input-clearable.component.html',
  styleUrls: ['./input-clearable.component.css']
})
export class InputClearableComponent {
  @Input() value = "";

  constructor() { }

  ngOnInit(): void {
  }

}
