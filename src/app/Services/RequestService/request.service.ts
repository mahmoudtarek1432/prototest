import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketRequestClient } from 'src/app/Endpoints/WebsocketRequestClient';
import { CityResponse } from 'src/app/models/city-response';
import { LoginEndpoint } from '../LoginService/login-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private client: WebsocketRequestClient) { }

  async GetCity(payload:CityResponse): Promise<Observable<CityResponse>>{
    return await this.client.requestNoType<CityResponse>(payload);
  }
}
