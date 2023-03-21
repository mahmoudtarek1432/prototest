import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";
import { EndpointsMap } from "src/Shared/EnpointMap";
import { SubjectHandler } from "../helper/Subject-helper";

export abstract class IResponseEndpoint<Response,endpoint>{
    constructor(subject: EndpointsSubjects){
        let x =
        EndpointsMap.CreateEndpoint(Response,endpoint)
    }
    abstract handle(handleData:any):void;
}