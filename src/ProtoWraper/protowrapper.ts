import * as protobuf from 'protobufjs';
import { ProtobufType } from './ProtoBufType';

/**A wrapper built on top of protobuf.js to ease implementation*/
export class ProtoWrapper<T extends ProtobufType>{
    ProtobufType!: ProtobufType

    constructor(Type: {new():T}){ 
        this.ProtobufType = new Type()
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
     * Use to encode an already created protoMessage
     * @param protobufMessage - The protomessage to be encoded
     * @param writer - The encoding writer
     * 
      */
    EncodeProto(protobufMessage:protobuf.Message<{}>,writer?:protobuf.Writer): Promise<Uint8Array>{
        return this.protoFileAccessor((message) =>{
            return message!.encode(protobufMessage,writer).finish()
        })
    }

    /**
     * Use to encode a an object of type protoMessage
     * @param payload 
     * @returns 
     */
    async EncodeMessage(payload: T): Promise<Uint8Array>{
        return await this.protoFileAccessor((message) => {
            var errmsg = message!.verify(payload)
            if(errmsg)
                throw Error(errmsg)
            //create a protoMessage wrapped arrount the protoType Object
            let protoMessage = message!.create(payload)
            //encodes proto message to uint8array 
            return message!.encode(protoMessage).finish()
        })
    }

    /**
     * 
     * @param encodedMessage - Decodes Encoded Messages using Uint8Array
     * @param Length 
     * @returns A promise protoMessage, use toObject To access the type members
     */
    DecodeToMessage(encodedMessage:Uint8Array,Length?:number):Promise<protobuf.Message<{}>> {
        return this.protoFileAccessor((message) => {
            return message!.decode(encodedMessage)
        })
    }

    async Decode(encodedMessage:Uint8Array):Promise<T>{
        return await this.protoFileAccessor((message) => {
            var decoded = message!.decode(encodedMessage)
            return message!.toObject(decoded)
        })
    }

    toObject(ProtoMessage: protobuf.Message<{}>){
        return this.protoFileAccessor((message) =>{
            return message!.toObject(ProtoMessage)
        })
    }

    



}

