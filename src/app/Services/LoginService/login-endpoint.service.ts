import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IResponseEndpoint } from 'src/app/Endpoints/IResponseEndpoint';
import { IResponse } from 'src/app/models/IResponse';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { EndpointsMap } from 'src/Shared/EnpointMap';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpoint<R extends IResponse> implements IResponseEndpoint<R> {
  constructor(private endpointSubjects:EndpointsSubjects) {
    EndpointsMap.CreateEndpoint(R,LoginEndpoint) 
  }
  handle(responseObj: LoginResponse): void {
    this.endpointSubjects.updateSubject<LoginResponse>(responseObj.requestId!, responseObj);
  }
}
