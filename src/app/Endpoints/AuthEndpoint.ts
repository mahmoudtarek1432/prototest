import { loginProto } from "src/proto/LoginProto";

export class AuthEndpoint{
    handleLogin(protoMessage:loginProto){
        console.log(protoMessage)
    }
}