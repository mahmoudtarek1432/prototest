import * as protobuf from "protobufjs";
import { ProtobufType } from "./ProtoBufType";
import { ProtoFileStringManipulation } from "./ProtoFileStringManipulation";

export class ProtoRootInstance{
    protoRoot!: protobuf.Type
    private static protoMessageFiles: Array<ProtoDetails> = new Array<ProtoDetails>()

    async instantiate(prototype: ProtobufType):Promise<any>{
        var buf = await protobuf.load(prototype.filename,new protobuf.Root())
        console.log(buf)
        this.protoRoot = buf.lookupType(`${prototype.packageName}.${prototype.className}`)
    }

    addProto(protoFile:string){
        let messageName = ProtoFileStringManipulation.ExtractMessageName(protoFile)

        let ExtendedProtoFile = ProtoFileStringManipulation.ConvertProtofile(protoFile,"response")

        let fileDetails = new ProtoDetails();
        fileDetails.messageName = messageName;
        fileDetails.protoFileBody = ExtendedProtoFile;

        ProtoRootInstance.protoMessageFiles.push(fileDetails)
    }

    /// there shall be a response endpoint and request endpoint
    buildEndpoint(){
        let endpoint ="syntax = \"proto3\";\
                       package Endpoint;\
                       message endpoint_temp{\ "

                       //push messages from array
            ProtoRootInstance.protoMessageFiles.forEach((file,i) =>{
                endpoint = endpoint + `repeated ${file.messageName} UnderTestForNow = ${i};\ `
            })



        endpoint = endpoint + "}";
                        
                    
    }
}

class ProtoDetails{
    messageName = ''
    protoFileBody = ''
}