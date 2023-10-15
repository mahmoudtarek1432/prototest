import { IRequest } from "../helper/Endpoint Managment/model/IRequest";
import { CityResponse } from "./city-response";
import { ProductResponse } from "./product-response";
import "reflect-metadata"

export function decorateEndpointType<T extends { new (...args: any[]): {} }>(constructor: T) {
    console.log(Reflect.getMetadata("design:type",constructor.prototype))
    
  }
  
@decorateEndpointType
export class ProductRequest extends IRequest {
    arrayObj:Array<number> = new Array<number>()
    name =""
    description = ""
    price = ""
    arr:number[] = []
    num: number = 0
    product: ProductResponse = new ProductResponse();
} 