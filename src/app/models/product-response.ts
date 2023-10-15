import { IResponse } from "../helper/Endpoint Managment/model/IResponse";

export class ProductResponse extends IResponse {
    name!:string
    description!:string;
    price!:number;
    } 