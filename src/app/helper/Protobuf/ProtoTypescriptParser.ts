import { EndpointType } from "./ProtoFileStringManipulation"

export class ProtoTypescriptParser{
    static addEndpointModelbyClass<T>(modelClass: {new():T}, type: EndpointType){
        var model = new modelClass ()
        
        Object.getOwnPropertyNames(model).map(n =>{
         let name = n as keyof typeof modelClass
         console.log(typeof model[name])
         if(typeof model[name] == "object"){
             //the passed variable is an object
            
         }
         else {
                var member = new protoDetails();
                member.memberName = name;
                member.memberType = typeof model[name];
            }
        })
    }
}

class protoDetails{
    memberName= "";
    memberType= "";
    message = new Array<protoDetails>; // gets filled if it was a message
}

