import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { IResponse } from '../models/IResponse';
import { IResponseEndpoint } from './IResponseEndpoint';

@Injectable({
  providedIn: 'root'
})
export class RequestEndpointResolver extends IResponseEndpoint<any> {

  constructor(private endpointSubjects: EndpointsSubjects) {
    super(endpointSubjects,LoginResponse);
   }

  handle<T extends IResponse>(responseObj: T){
    this.endpointSubjects.updateSubject<T>(responseObj.requestId.toString(), responseObj);
  }
}
