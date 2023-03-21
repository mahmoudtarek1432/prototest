import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";
import { SubjectHandler } from "../helper/Subject-helper";

export abstract class IResponseEndpoint{
    constructor(subject: EndpointsSubjects){
        
    }
    abstract handle(handleData:any):void;
}