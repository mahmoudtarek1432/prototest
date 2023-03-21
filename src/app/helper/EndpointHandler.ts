import { EndpointResponses } from "../models/endpoint-responses"
import { ServiceInstancefactory } from "./ServiceInstancefactory"

export class EndpointReciever{
    static handle(endpointRersponses: EndpointResponses){
            let properties = Object.getOwnPropertyNames(endpointRersponses)
            properties.forEach((propertyName) =>{
              let propertyKey = propertyName as keyof typeof endpointRersponses
              endpointRersponses[propertyKey]?.map((w) => {
                ServiceInstancefactory.createInstance(Object.getPrototypeOf(w).constructor).handle(w)
              })
            })
        }
    }
