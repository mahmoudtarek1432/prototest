import { AppModule } from "../app.module";
import { LoginService } from "../Services/LoginService/login.service";
import { IResponseEndpoint } from "./IResponseEndpoint";


/**
 * according to the incoming response id, the services gets injected : if decorated with injectable.
 */
export class EndpointResponseFactory{
     static Create<T extends IResponseEndpoint>(id: number): T{
        return AppModule.injectorInstance.get(this.endpoints[id],new Error("endpoint not found")) //depricated
    }
    private static endpoints:{[id:number] : any} ={
        1 : LoginService
    }
}