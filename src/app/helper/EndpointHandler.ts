import { EndpointResponses } from "../models/endpoint-responses"
import { ServiceInstancefactory } from "./ServiceInstancefactory"


/**
 * calls a handler, used for handling incoming endpointResponses
 */
export class EndpointReciever{
    static handle(endpointRersponses: EndpointResponses){
            let properties = Object.getOwnPropertyNames(endpointRersponses)            //casts Object Properties into an array of strings
            properties.forEach((propertyName) =>{                                      
              let propertyKey = propertyName as keyof typeof endpointRersponses        // typeof returns a class name as a string, further keyof assigns the propertyname string
              endpointRersponses[propertyKey]?.map((Response) => {                            // as a property of endpointResponse Class
                //tb - check status for broadcast or request based event
                let endpoint = ServiceInstancefactory.createInstance(Object.getPrototypeOf(Response).constructor); //returns an endpoint according to the passed response's prototype
                endpoint.handle(Response); 
              })
            })
        }
    }
