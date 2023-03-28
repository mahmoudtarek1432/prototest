import { IRequest } from "../helper/Endpoint Managment/model/IRequest";


export class ProductResponse extends IRequest {

        token!: number;
        name!: string;
        list!: number[];
    } 