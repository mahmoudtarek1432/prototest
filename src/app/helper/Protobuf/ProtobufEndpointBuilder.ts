import { EndpointType, ProtoFileStringManipulation } from "./ProtoFileStringManipulation";

export class ProtobufEndpointBuilder{

    private protoMessageFiles: Array<ProtoDetails> = new Array<ProtoDetails>()

    addProtoEndpoint(protoFile:string, type: EndpointType){
        let messageName = ProtoFileStringManipulation.ExtractMessageName(protoFile)

        let ExtendedProtoFile = ProtoFileStringManipulation.ConvertProtofile(protoFile,type)

        let fileDetails = new ProtoDetails();
        fileDetails.messageName = messageName;
        fileDetails.protoFileBody = ExtendedProtoFile;

        this.protoMessageFiles.push(fileDetails)
    }

    /// there shall be a response endpoint and request endpoint
    buildEndpoint(){
        let endpoint ="syntax = \"proto3\";\
                       package Endpoint;\
                       message RequestEndpoints{\ "

                       //push messages from array
                       this.protoMessageFiles.forEach((file,i) =>{
                endpoint = endpoint + `repeated ${file.messageName} ${this.configureMessageName(file.messageName)} = ${i};\ `
            })



        endpoint = endpoint + "}";
                        
        return endpoint;        
    }

    //converts messageName into memberName by ignoring first letter and inserting an _ before capital letters asuming the name is in js nameing conventions
    configureMessageName(messageName: string){
        let newString = ''
        for(let i = 1; i < messageName.length; i++){
            if(65 <= messageName[i].charCodeAt(0) &&  messageName[i].charCodeAt(0) <= 90){ // 65 is for A and 90 is for Z
                let righthand = messageName.slice(0,i);
                let lefthand = messageName.slice(i,messageName.length);
                newString = righthand + "_" + lefthand

            }
        }
        return newString.toLowerCase()
    }
}

class ProtoDetails{
    messageName = ''
    protoFileBody = ''
}
