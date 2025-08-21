import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionLegal } from './revision-legal';

describe('RevisionLegal', () => {
  let component: RevisionLegal;
  let fixture: ComponentFixture<RevisionLegal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionLegal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionLegal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
