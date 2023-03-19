import * as protobuf from 'protobufjs';
import { ProtobufType } from './ProtoBufType';

/**A wrapper built on top of protobuf.js to ease implementation*/
export class ProtoWrapper<T extends ProtobufType>{

    ProtobufType! : ProtobufType
    result!:any

    constructor(protobufType:ProtobufType){
        this.ProtobufType = protobufType
    }

    /**function handels accessing the .proto file containing the package and its message types
    callback function handels the protobuf.js library toolset such as encoding/decoding/create/verify */
    async protoFileAccessor(procedureCallback:(protomessage: protobuf.Type| undefined) => any):Promise<any>{

        var buf = await protobuf.load(this.ProtobufType.filePath)
        var msg = buf.lookupType(this.ProtobufType.ObjectLookupType)
        return procedureCallback(msg)
    }

    verify(payload:{k : [string]}){
        this.protoFileAccessor((message) => {
            var errmsg = message!.verify(payload)
            if(errmsg)
                throw Error(errmsg)
        })
    }

    /**
     * @param payload - The payload to be sent inside the message
     * Avoid naming the key using the protobuf naming convention as it will return an empty protomessage
     * (_)
     */
    create(payload: any):Promise<protobuf.Message<{}>>{
        return this.protoFileAccessor((message):protobuf.Message<{}> => {
            var errmsg = message!.verify(payload)
            if(errmsg)
                throw Error(errmsg)
            console.log(payload)
            return message!.create(payload)
        })
    }
    
     /**
     * @param protobufMessage - The protomessage to be encoded
     * @param writer - The encoding writer
     * 
      */
    Encode(protobufMessage:protobuf.Message<{}>,writer?:protobuf.Writer): Promise<Uint8Array>{
        return this.protoFileAccessor((message) =>{
            return message!.encode(protobufMessage,writer).finish()
        })

    }

    /**
     * 
     * @param encodedMessage - Decodes Encoded Messages using Uint8Array
     * @param Length 
     * @returns A promise protoMessage, use toObject To access the type members
     */
    Decode(encodedMessage:Uint8Array,Length?:number):Promise<protobuf.Message<{}>> {
        return this.protoFileAccessor((message) => {
            console.log(message!.decode(encodedMessage))
            return message!.decode(encodedMessage)
        })
    }

    toObject(ProtoMessage: protobuf.Message<{}>){
        return this.protoFileAccessor((message) =>{
            return message!.toObject(ProtoMessage)
        })
    }

    



}

