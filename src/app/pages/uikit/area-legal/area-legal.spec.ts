import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaLegal } from './area-legal';

describe('AreaLegal', () => {
  let component: AreaLegal;
  let fixture: ComponentFixture<AreaLegal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaLegal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaLegal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
