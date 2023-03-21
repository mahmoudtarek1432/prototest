import { SubjectHandler } from "../helper/Subject-helper";
import { IResponse } from "../models/IResponse";

export interface IResponseEndpoint<R extends IResponse>{
    handle(handleData:any):void;
}