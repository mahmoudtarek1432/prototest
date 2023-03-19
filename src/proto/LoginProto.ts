import { ProtobufType } from "src/ProtoWraper/ProtoBufType";

export class loginProto extends ProtobufType{
    constructor(awesomeField:string="", awesomeType:number=0){
        super("dummy", "dummy")
        this.awesomeField = awesomeField;
        this.awesomeType = awesomeType;
    }


    awesomeField!:string;
    awesomeType!: number;

}