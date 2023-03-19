import { loginProto } from "src/proto/LoginProto";
import { Globals } from "src/Shared/Globals";

export class loginEndpoint{
    constructor(private globals:Globals){
        
    }

    handleLogin(protoMessage:loginProto){
        console.log(protoMessage)
    }
}