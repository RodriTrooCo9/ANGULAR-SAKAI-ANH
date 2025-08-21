import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEmpresa } from './forms-empresa';

describe('FormsEmpresa', () => {
  let component: FormsEmpresa;
  let fixture: ComponentFixture<FormsEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
