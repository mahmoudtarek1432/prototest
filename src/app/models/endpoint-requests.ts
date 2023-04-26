import { CityRequest } from './city-request';
import { IEndpointTransferObject } from "../Endpoints/Interface/IEndpointTransferObject"
import { ProductRequest } from './product-request';

export class RequestEndpoints implements IEndpointTransferObject{
    product_requests?:Array<ProductRequest>
    constructor(){
        this.product_requests = new Array<ProductRequest>
    }
}