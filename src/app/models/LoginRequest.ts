import { loginProto } from "src/proto/LoginProto"
import { ProtobufType } from "src/ProtoWraper/ProtoBufType"
import { IRequest } from "./IRequest"

export class LoginResponse extends IRequest{
    
    loginData:loginProto
    constructor( LoginData:loginProto=new loginProto()){
        super(1)
        this.loginData = LoginData
    }
}