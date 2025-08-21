import { TestBed } from '@angular/core/testing';

import { DataSharing } from './data-sharing.service';

describe('DataSharing', () => {
  let service: DataSharing;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSharing);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
