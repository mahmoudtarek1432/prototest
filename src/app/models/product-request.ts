import { IRequest } from "../helper/Endpoint Managment/model/IRequest";
import { CityResponse } from "./city-response";
import { ProductResponse } from "./product-response";


export class ProductRequest extends IRequest {
    name =""
    description = ""
    price = ""
    test:ProductResponse = new ProductResponse()
} 