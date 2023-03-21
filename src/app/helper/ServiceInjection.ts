import { AppModule } from "../app.module";
import { LoginService } from "../Services/LoginService/login.service";
import { IResponseEndpoint } from "../Endpoints/IResponseEndpoint";
import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";


/**
 * according to the incoming response id, the services gets injected : if decorated with injectable.
 */
export class ServiceInjection{
    static Create<T extends IResponseEndpoint>(Type:{new(subscriptions:EndpointsSubjects):T}): T{
        return AppModule.injectorInstance.get(typeof Type,new Error("endpoint not found")) //depricated
    }
}