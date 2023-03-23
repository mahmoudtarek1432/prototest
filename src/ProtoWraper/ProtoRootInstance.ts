import * as protobuf from "protobufjs";
import { ProtobufType } from "./ProtoBufType";

export class ProtoRootInstance{
    protoRoot!: protobuf.Type

    async instantiate(prototype: ProtobufType):Promise<any>{
        var buf = await protobuf.load(prototype.filename,new protobuf.Root())
        console.log(buf)
        this.protoRoot = buf.lookupType(`${prototype.packageName}.${prototype.className}`)
    }
}