import { ServiceInjection } from "./ServiceInjection";
import { IResponseEndpoint } from "../Endpoints/IResponseEndpoint";
import { EndpointsMap } from "src/Shared/EnpointMap";
import { IResponse } from "../models/IResponse";
import { IRequest } from "../models/IRequest";
import { SubjectHandler } from "./Subject-helper";

export class ServiceInstancefactory{
    static createInstance<R extends IResponse>(reponseType: { new ():R}): IResponseEndpoint{
        let serviceType = EndpointsMap.resolveEndpoint(reponseType.name)
        return ServiceInjection.Create(serviceType)
    }
}