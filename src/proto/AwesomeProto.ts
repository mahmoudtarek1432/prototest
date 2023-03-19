import { ProtobufType } from "src/ProtoWraper/ProtoBufType";

export class AwesomeProto extends ProtobufType{
    constructor(awesomeField:string="", awesomeType:number=0){
        super("./assets/testingprotojs.proto", "package.testingproto")
        this.awesomeField = awesomeField;
        this.awesomeType = awesomeType;
    }


    awesomeField!:string;
    awesomeType!: number;

}