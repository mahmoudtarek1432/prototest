import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";
import { EndpointsMap } from "src/Shared/EnpointMap";
import { SubjectHandler } from "../helper/Subject-helper";
import { IResponse } from "../models/IResponse";

export abstract class IResponseEndpoint{
    constructor(subject: EndpointsSubjects){
    }
    abstract handle(handleData:any):void;
}