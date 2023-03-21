import { IResponseEndpoint } from "src/app/Endpoints/IResponseEndpoint";
import { SubjectHandler } from "src/app/helper/Subject-helper";
import { IResponse } from "src/app/models/IResponse";
import { EndpointsSubjects } from "./Endpoints-Subjects";

export abstract class EndpointsMap{
    static Map:{[k:string]: {new(subscriptions:EndpointsSubjects):IResponseEndpoint}} = {

    }
    static CreateEndpoint<R extends IResponse,S extends IResponseEndpoint>(Response :{new():R}, Endpoint :{new(subscriptions:EndpointsSubjects):S}){
        let ResponseName = Response.name
        EndpointsMap.Map[ResponseName] = Endpoint;
    }

    static resolveEndpoint(ResponseName :string): {new(subscriptions:EndpointsSubjects):IResponseEndpoint}{
        return EndpointsMap.Map[ResponseName];
    }
}