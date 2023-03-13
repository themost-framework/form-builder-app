import { TestBed } from '@angular/core/testing';

import { ComponentEventService } from './component-event.service';

describe('ComponentEventService', () => {
  let service: ComponentEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
