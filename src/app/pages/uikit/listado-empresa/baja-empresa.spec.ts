import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaEmpresa } from './baja-empresa';

describe('BajaEmpresa', () => {
  let component: BajaEmpresa;
  let fixture: ComponentFixture<BajaEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajaEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
