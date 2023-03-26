import { Injectable } from '@angular/core';
import { Observable, Subject, timeInterval } from 'rxjs';
import { IResponseEndpoint } from 'src/app/Endpoints/IResponseEndpoint';
import { IResponse } from 'src/app/models/IResponse';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { EndpointsMap } from 'src/Shared/EnpointMap';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpoint extends IResponseEndpoint<LoginResponse>{
  constructor(private endpointSubjects:EndpointsSubjects) {
    super(endpointSubjects,LoginResponse)
  }

  handle(responseObj: LoginResponse): void {
    let a = new Array(5000)
    for(let x of a){
      console.log(x)
    }
    this.endpointSubjects.updateSubject<LoginResponse>(LoginEndpoint.name, responseObj);
  }
}
