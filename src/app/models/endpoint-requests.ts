import { CityRequest } from './city-request';
import { IEndpointTransferObject } from "../Endpoints/Interface/IEndpointTransferObject"

export class RequestEndpoints implements IEndpointTransferObject{
    city_requests?:Array<CityRequest>
    constructor(){
        this.city_requests = new Array<CityRequest>
    }
}