import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IResponseEndpoint } from 'src/app/Endpoints/IResponseEndpoint';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpoint implements IResponseEndpoint {
  constructor(private endpointSubjects:EndpointsSubjects) { }
  handle(responseObj: LoginResponse): void {
    this.endpointSubjects.updateSubject<LoginResponse>(responseObj.requestId!, responseObj);
  }
}
