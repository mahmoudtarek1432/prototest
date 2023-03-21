import { AppModule } from "../app.module";
import { LoginService } from "../Services/LoginService/login.service";
import { IResponseEndpoint } from "../Endpoints/IResponseEndpoint";
import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";


/**
 * Injects The dependencies in the constructor for Endpoint Services
 */
export class ServiceInjection{
    static Create<T extends IResponseEndpoint>(Type:{new(subscriptions:EndpointsSubjects):T}): T{
        return AppModule.injectorInstance.get(typeof Type,new Error("endpoint not found")) //depricated
    }
}