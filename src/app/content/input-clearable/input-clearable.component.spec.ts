import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputClearableComponent } from './input-clearable.component';

describe('InputErrorStateMatcherComponent', () => {
  let component: InputClearableComponent;
  let fixture: ComponentFixture<InputClearableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputClearableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputClearableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
