import { AppModule } from "../app.module";
import { LoginService } from "../Services/LoginService/login.service";
import { IResponseEndpoint } from "./IResponseEndpoint";


/**
 * according to the incoming response id, the services gets injected : if decorated with injectable.
 */
export class EndpointResponseFactory{
    private static requestId = 1;

    public static GetNewRequestId(): number {
        return EndpointResponseFactory.requestId++;
    }

    static Create<T extends IResponseEndpoint>(Type:{new():T}): T{
        return AppModule.injectorInstance.get(typeof Type,new Error("endpoint not found")) //depricated
    }
    private static endpoints:{[id:number] : any} ={
        1 : LoginService
    }
}