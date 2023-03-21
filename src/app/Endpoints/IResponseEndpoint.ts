import { SubjectHandler } from "../helper/Subject-helper";

export interface IResponseEndpoint{
    handle(handleData:any):void;
}