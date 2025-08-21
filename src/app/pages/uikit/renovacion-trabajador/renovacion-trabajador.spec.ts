import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovacionTrabajador } from './renovacion-trabajador';

describe('RenovacionTrabajador', () => {
  let component: RenovacionTrabajador;
  let fixture: ComponentFixture<RenovacionTrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovacionTrabajador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovacionTrabajador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
