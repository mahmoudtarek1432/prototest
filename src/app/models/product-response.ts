import { IResponse } from "../helper/Endpoint Managment/model/IResponse";

export class ProductResponse extends IResponse {

        token!: number;
        name!: string;
        list!: number[];
    } 