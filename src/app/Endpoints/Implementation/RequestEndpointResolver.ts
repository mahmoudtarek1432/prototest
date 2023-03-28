import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/app/helper/Subject/Endpoints-Subjects';
import { IResponse } from '../../helper/Endpoint Managment/model/IResponse';
import { IEndpoint } from '../Interface/IResponseEndpoint';

@Injectable({
  providedIn: 'root'
})
export class RequestEndpointResolver extends IEndpoint<any> {

  constructor(private endpointSubjects: EndpointsSubjects) {
    super(LoginResponse);
   }

  override handle(responseObj: any){
    this.endpointSubjects.updateSubject<typeof responseObj>(responseObj.requestId.toString(), responseObj);
  }
}
