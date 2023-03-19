import { ProtobufType } from "src/ProtoWraper/ProtoBufType"
import { IRequest } from "./IRequest"

export class AuthResponse extends IRequest{
    
    loginData:ProtobufType
    constructor(LoginData:ProtobufType){
        super(2)
        this.loginData = LoginData
    }
}