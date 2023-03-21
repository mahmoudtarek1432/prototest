import { IResponseEndpoint } from "src/app/Endpoints/IResponseEndpoint";
import { SubjectHandler } from "src/app/helper/Subject-helper";
import { IResponse } from "src/app/models/IResponse";
import { EndpointsSubjects } from "./Endpoints-Subjects";

export abstract class EndpointsMap{
    static Map:{[k:string]: {new(subscriptions:EndpointsSubjects):IResponseEndpoint}} = {

    }
    static CreateEndpoint<R extends IResponse,S extends IResponseEndpoint>(response :{new():IResponse}, endpoint :{new(subscriptions:EndpointsSubjects):S}){
        let responseName = response.name
        EndpointsMap.Map[responseName] = endpoint;
    }

    static resolveEndpoint(responseName :string): {new(subscriptions:EndpointsSubjects):IResponseEndpoint}{
        return EndpointsMap.Map[responseName];
    }
}