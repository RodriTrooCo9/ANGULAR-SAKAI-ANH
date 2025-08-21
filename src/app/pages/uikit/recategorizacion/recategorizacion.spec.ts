import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recategorizacion } from './recategorizacion';

describe('Recategorizacion', () => {
  let component: Recategorizacion;
  let fixture: ComponentFixture<Recategorizacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recategorizacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recategorizacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
