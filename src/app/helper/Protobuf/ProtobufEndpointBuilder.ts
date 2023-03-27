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
            let FieldName = ProtoFileStringManipulation.configureMessageName(file.messageName)+"s"
            endpoint = endpoint + `repeated ${file.messageName} ${FieldName} = ${i+1};\ `
        })

        this.protoMessageFiles.forEach((details) =>{
            endpoint = endpoint + details.protoFileBody + '\ '
        })

        endpoint = endpoint + "}\ ";


                        
        return endpoint;        
    }
}

class ProtoDetails{
    messageName = ''
    protoFileBody = ''
}
