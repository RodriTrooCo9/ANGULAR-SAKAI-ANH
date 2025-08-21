import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorPDF } from './generador-pdf';

describe('GeneradorPDF', () => {
  let component: GeneradorPDF;
  let fixture: ComponentFixture<GeneradorPDF>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneradorPDF]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneradorPDF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
