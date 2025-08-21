import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTrabajador } from './forms-trabajador';

describe('FormsTrabajador', () => {
  let component: FormsTrabajador;
  let fixture: ComponentFixture<FormsTrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsTrabajador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsTrabajador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
