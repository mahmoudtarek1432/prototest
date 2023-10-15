import { EndpointType } from "./ProtoFileStringManipulation"
import * as utilTypes from 'utility-types'
export class ProtoTypescriptParser{
    static addEndpointModelbyClass<T>(modelClass: {new():T}, type: EndpointType){
        var model = new modelClass () as any
        
        Object.getOwnPropertyNames(model).map(name =>{
         let nameKeyed = name as keyof typeof modelClass
         var obj = model[nameKeyed]
         console.log(`Name: ${nameKeyed}  PropertyNames: ${Object.getOwnPropertyNames(model[nameKeyed])} type: ${Object.getPrototypeOf(model)}` )
         console.log(Object.getOwnPropertyDescriptors(model[nameKeyed]))
         var t = model[nameKeyed]
         type PropsValues = utilTypes.ValuesType<typeof t>;

         
         
        /* if(model[nameKeyed] instanceof Array){
             //the passed variable is an object
             console.log(typeof model[nameKeyed])
         }
         else {
                var member = new protoDetails();
                member.memberName = name;
                member.memberType = typeof model[nameKeyed];
            }*/
        })
        return model
    }
    
}

class protoDetails{
    memberName= "";
    memberType= "";
    message = new Array<protoDetails>; // gets filled if it was a message
}
