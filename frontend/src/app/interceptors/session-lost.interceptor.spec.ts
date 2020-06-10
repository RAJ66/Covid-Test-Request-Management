import { TestBed } from '@angular/core/testing';

import { SessionLostInterceptor } from './session-lost.interceptor';

describe('SessionLostInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SessionLostInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SessionLostInterceptor = TestBed.inject(SessionLostInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
