import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginResponse } from 'src/app/models/login-response';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private endpointSubjects:EndpointsSubjects) { }

  AuthResponse(responseObj:LoginResponse){
    this.endpointSubjects.updateSubject<LoginResponse>(responseObj.responseId!, responseObj)
  }
}
