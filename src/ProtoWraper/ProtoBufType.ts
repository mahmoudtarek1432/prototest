
/**
 * An abstract class for assigning protobuf models 
 * ** @param filePath and @param ObjectLookupType should be instantiated in the constructor's Super
 */
export abstract class ProtobufType{
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