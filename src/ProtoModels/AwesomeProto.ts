import { ProtobufType } from "src/ProtoWraper/ProtoBufType";

export class AwesomeProto extends ProtobufType{
    constructor(){
        super("./assets/testingprotojs.proto", "package.testingproto")
    }


    awesomeField = '';
    awesomeType = 0;

}