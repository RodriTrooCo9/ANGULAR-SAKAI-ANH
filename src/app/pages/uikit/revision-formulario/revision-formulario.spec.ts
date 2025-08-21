import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionFormulario } from './revision-formulario';

describe('RevisionFormulario', () => {
  let component: RevisionFormulario;
  let fixture: ComponentFixture<RevisionFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
