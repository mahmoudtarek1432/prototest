import { IResponseEndpoint } from "src/app/Endpoints/IResponseEndpoint";
import { SubjectHandler } from "src/app/helper/Subject-helper";
import { IResponse } from "src/app/models/IResponse";
import { EndpointsSubjects } from "./Endpoints-Subjects";

/**
 * handles the Response - ResponseEndpoint Mapping, mainly used for broadcasting
 * Classes that extends IResponseEndpoint shall use CreateEndpoint to Register The response and the appropriate Endpoint
 */
export abstract class EndpointsMap{
    static Map:{[k:string]: {new(subscriptions:EndpointsSubjects):IResponseEndpoint<IResponse>}} = { } // key value pair pool 

    static CreateEndpoint<R extends IResponse,S extends IResponseEndpoint<R>>(response :{new():R}, endpoint :{new(subscriptions:EndpointsSubjects):S}){
        let responseName = response.name
        if(EndpointsMap.Map[responseName] == undefined)
            EndpointsMap.Map[responseName] = endpoint;
    }

    static resolveEndpoint(responseName :string): {new(subscriptions:EndpointsSubjects):IResponseEndpoint<IResponse>}{
        let responseEndpoint = EndpointsMap.Map[responseName];
        if(responseEndpoint == undefined)
            throw new Error("endpoint not configured for this response, Map it using CreateEndpoint function")
        return responseEndpoint
    }
}