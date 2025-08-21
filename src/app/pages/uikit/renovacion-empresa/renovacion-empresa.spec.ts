import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovacionEmpresa } from './renovacion-empresa';

describe('RenovacionEmpresa', () => {
  let component: RenovacionEmpresa;
  let fixture: ComponentFixture<RenovacionEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovacionEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovacionEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
