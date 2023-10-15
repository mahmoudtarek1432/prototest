import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketRequestClient } from 'src/app/Endpoints/Implementation/WebsocketRequestClient';
import { CityRequest } from 'src/app/models/city-request';
import { CityResponse } from 'src/app/models/city-response';
import { ProductRequest } from 'src/app/models/product-request';

@Injectable({
  providedIn: 'root'
})
export class CityService{

constructor(private client: WebsocketRequestClient) { }

  GetCity(payload:ProductRequest): Observable<CityResponse>{
    return this.client.request<CityResponse>(payload);
  }
}
