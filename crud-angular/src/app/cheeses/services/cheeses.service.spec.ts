import { CheesesService } from './cheeses.service';
import { TestBed } from '@angular/core/testing';

describe('CheesesService', () => {
  let service: CheesesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheesesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
