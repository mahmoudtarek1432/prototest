import { ServiceInjection } from "./ServiceInjection";
import { EndpointsMap } from "src/app/helper/Endpoint Managment/EnpointMap";
import { IResponse } from "src/app/helper/Endpoint Managment/model/IResponse"; 
import { IResponseEndpoint } from "src/app/Endpoints/Interface/IResponseEndpoint";


export class ServiceInstancefactory{
    /**
    * Uses @class EndpointMap to fetch The incoming response's mapped Service
    * @param responseType - takes a class instance that extends IResponse
    * @returns an object that extends IResponseEndpoint,     
    */
    static createInstance<R extends IResponse>(reponseType: { new ():R}): IResponseEndpoint<IResponse>{
        let serviceType = EndpointsMap.resolveEndpoint(reponseType.name)
        return ServiceInjection.Create(serviceType)
    }
}