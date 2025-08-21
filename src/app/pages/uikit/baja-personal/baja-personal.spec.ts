import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaPersonal } from './baja-personal';

describe('BajaPersonal', () => {
  let component: BajaPersonal;
  let fixture: ComponentFixture<BajaPersonal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajaPersonal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaPersonal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
