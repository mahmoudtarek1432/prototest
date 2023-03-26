import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/app/helper/Subject/Endpoints-Subjects';
import { IResponse } from '../../helper/Endpoint Managment/model/IResponse';
import { IResponseEndpoint } from '../Interface/IResponseEndpoint';

@Injectable({
  providedIn: 'root'
})
export class RequestEndpointResolver extends IResponseEndpoint<any> {

  constructor(private endpointSubjects: EndpointsSubjects) {
    super(endpointSubjects,LoginResponse);
   }

  override handle(responseObj: any){
    this.endpointSubjects.updateSubject<typeof responseObj>(responseObj.requestId.toString(), responseObj);
  }
}
