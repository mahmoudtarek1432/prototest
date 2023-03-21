import { loginProto } from "src/proto/LoginProto"
import { ProtobufType } from "src/ProtoWraper/ProtoBufType"
import { IRequest } from "./IRequest"

export class LoginRequest extends IRequest{
    
    awesomeField!:string;
    awesomeType!: number;

    constructor(awesomeField:string, awesomeType: number){
        super();
        this.awesomeField = awesomeField;
        this.awesomeType = awesomeType;
    }
}