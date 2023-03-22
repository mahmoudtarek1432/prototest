import { TestBed } from '@angular/core/testing';

import { LoginEndpoint} from './login-endpoint.service';

describe('LoginEndpointService', () => {
  let service: LoginEndpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEndpoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
