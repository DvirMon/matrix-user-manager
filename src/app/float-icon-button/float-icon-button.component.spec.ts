import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatIconButtonComponent } from './float-icon-button.component';

describe('FloatIconButtonComponent', () => {
  let component: FloatIconButtonComponent;
  let fixture: ComponentFixture<FloatIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FloatIconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
