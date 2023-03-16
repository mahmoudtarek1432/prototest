import * as protobuf from 'protobufjs';

/**A wrapper built on top of protobuf.js to ease implementation*/
export class ProtoWrapper{

    ProtobufType! : ProtobufType
    result!:any

    constructor(protobufType:ProtobufType){
        this.ProtobufType = protobufType
    }

    /**function handels accessing the .proto file containing the package and its message types
    callback function handels the protobuf.js library toolset such as encoding/decoding/create/verify */
    protoFileAccessor(procedureCallback:(protomessage: protobuf.Type| undefined) => any):any{
    
        protobuf.load(this.ProtobufType.filePath,((err,root)=>{
        var message = root?.lookupType(this.ProtobufType.ObjectLookupType);
        
        this.result = procedureCallback(message)
        }))
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
    create(payload:{k : [string]}):protobuf.Message<{}>{
        return this.protoFileAccessor((message):protobuf.Message<{}> => {
            var errmsg = message!.verify(payload)
            if(errmsg)
                throw Error(errmsg)

            return message!.create(payload)
        })
    }
    

    Encode(protobufMessage:protobuf.Message<{}>,writer?:protobuf.Writer): any{
        var feedback :any
        return this.protoFileAccessor((message) =>{
            console.log(protobufMessage, writer)
            feedback = message!.encode(protobufMessage,writer).finish()
            return feedback
        })
    }

    Decode(encodedMessage:Uint8Array,Length?:number):protobuf.Message<{}> {
        return this.protoFileAccessor((message) => {
            if(Length)
                return message!.decode(encodedMessage,length)
            
            return message!.decode(encodedMessage,length)
        })
    }

    



}

export class ProtobufType{
    /**Access string for protoObject used as an argument in the protobuf.load function*/
    filePath!: string

    /**String passed will act as the proto message type
     * covention: "PackageName.MessageType"
    */
    ObjectLookupType!: string
    /** 
     * @param filePath - Access string for protoObject used as an argument in the protobuf.load function
     * 
     * @param ObjectLookupType - tring passed will act as the proto message type covention: "PackageName.MessageType"
     * */ 
    
    constructor(filePath:string, ObjectLookupType:string){
        this.filePath = filePath
        this.ObjectLookupType = ObjectLookupType
    }
}