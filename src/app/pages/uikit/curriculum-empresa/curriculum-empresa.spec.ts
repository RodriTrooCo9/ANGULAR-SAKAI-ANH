import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumEmpresa } from './curriculum-empresa';

describe('CurriculumEmpresa', () => {
  let component: CurriculumEmpresa;
  let fixture: ComponentFixture<CurriculumEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculumEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
