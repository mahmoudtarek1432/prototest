import { Injectable } from '@angular/core';
import { IEndpoint } from 'src/app/Endpoints/Interface/IResponseEndpoint';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/app/helper/Subject/Endpoints-Subjects';
import { EndpointsMap } from 'src/app/helper/Endpoint Managment/EnpointMap';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpoint extends IEndpoint<LoginResponse>{
  constructor() {
    super(LoginResponse)
  }
}
