import { Injectable } from '@angular/core';
import { IEndpoint } from 'src/app/Endpoints/Interface/IResponseEndpoint';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/app/helper/Subject/Endpoints-Subjects';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpoint extends IEndpoint<LoginResponse>{
  constructor(private endpointSubjects:EndpointsSubjects) {
    super(LoginResponse)
  }
  protected override ProcessData<LoginResponse>(ResponseObject: LoginResponse) {
    //process
  }
}
