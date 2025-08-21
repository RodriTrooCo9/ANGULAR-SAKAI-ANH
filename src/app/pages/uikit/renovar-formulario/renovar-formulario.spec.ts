import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovarFormulario } from './renovar-formulario';

describe('RenovarFormulario', () => {
  let component: RenovarFormulario;
  let fixture: ComponentFixture<RenovarFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovarFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovarFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
