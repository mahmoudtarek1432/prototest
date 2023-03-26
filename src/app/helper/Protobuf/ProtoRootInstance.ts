import * as protobuf from "protobufjs";
import { ProtobufType } from "./ProtoBufType";

export class ProtoRootInstance{
    protoRoot!: protobuf.Type
    private static protoMessageFiles: Array<ProtoDetails> = new Array<ProtoDetails>()

    async instantiate(prototype: ProtobufType):Promise<any>{
        var buf = await protobuf.load(prototype.filename,new protobuf.Root())
        console.log(buf)
        this.protoRoot = buf.lookupType(`${prototype.packageName}.${prototype.className}`)
    }

    addProto(protoFile:string){
        let messageName = ""
        let firstChar = protoFile.indexOf("message ")+1;


        //extract message name
        for (let i = firstChar; i < protoFile.length; i++){
            if(protoFile[i] == " " || protoFile[i] == "{"){ //first encountered after message name
                break;
            }
            messageName = messageName + protoFile[i]
        }

        let fileDetails = new ProtoDetails();
        fileDetails.messageName = messageName;
        fileDetails.protoFileBody = protoFile;

        ProtoRootInstance.protoMessageFiles.push(fileDetails)
    }

    /// there shall be a response endpoint and request endpoint
    buildEndpoint(){
        let endpoint ="syntax = \"proto3\";\
                       package Endpoint;\
                       message endpoint_temp{"

                       //push messages from array

                       +"}";
                        
                    
    }
}

class ProtoDetails{
    messageName = ''
    protoFileBody = ''
}