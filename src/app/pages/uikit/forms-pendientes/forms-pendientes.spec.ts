import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPendientes } from './forms-pendientes';

describe('FormsPendientes', () => {
  let component: FormsPendientes;
  let fixture: ComponentFixture<FormsPendientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsPendientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsPendientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
