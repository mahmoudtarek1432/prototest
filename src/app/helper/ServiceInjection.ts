import { AppModule } from "../app.module";
import { LoginService } from "../Services/LoginService/login.service";
import { IResponseEndpoint } from "../Endpoints/IResponseEndpoint";
import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";
import { IResponse } from "../models/IResponse";


/**
 * Injects The dependencies in the constructor for Endpoint Services
 */
export class ServiceInjection{
    static Create<T extends IResponseEndpoint<IResponse>>(Type:{new(subscriptions:EndpointsSubjects):T}): T{
        let endpoint = AppModule.injectorInstance.get(Type,new Error("endpoint not found")); //depricated
        if(endpoint === "endpoint not found")
            throw endpoint
        return endpoint;
    }
}