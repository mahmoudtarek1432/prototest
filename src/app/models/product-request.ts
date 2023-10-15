import { IRequest } from "../helper/Endpoint Managment/model/IRequest";


export class ProductRequest extends IRequest {
    name!:string
    description!:string;
    price!:number;
} 