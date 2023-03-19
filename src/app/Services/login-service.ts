import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketClient } from '../helper/websocket-client';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private websocketClient: WebsocketClient) {
    websocketClient.AddOb();
  }

  getAll(): Observable<ListBranchResponse> {
    return this.websocketClient.get<ListBranchResponse>(`${environment.BASE_URL}/${this.mainEndpoint}`);
  }

  addCity(): Observable<ListBranchResponse> {
    return this.websocketClient.get<ListBranchResponse>(`${environment.BASE_URL}/${this.mainEndpoint}`);
  }
}
