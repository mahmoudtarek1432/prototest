import { RequestEndpoints } from "src/app/models/endpoint-requests"
import { IRequest } from "./model/IRequest"

export class EndpointFeeder{
    static FeedRequestEndpoint<obj extends IRequest>(property: obj, endpoint: RequestEndpoints): RequestEndpoints{
        let propertyNames =  Object.getOwnPropertyNames(endpoint)
        propertyNames.forEach((n) => {
            let key = n as keyof typeof endpoint
            if(typeof property == typeof endpoint[key]){
                endpoint[key]?.push(property)
            }
        })
        return endpoint
    }
}