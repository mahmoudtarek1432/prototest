import { AppModule } from "src/app/app.module";
import { IEndpoint } from "src/app/Endpoints/Interface/IResponseEndpoint";
import { IResponse } from "src/app/helper/Endpoint Managment/model/IResponse";
import { EndpointsSubjects } from "src/app/helper/Subject/Endpoints-Subjects";


/**
 * Injects The dependencies in the constructor for Endpoint Services
 */
export class ServiceInjection{
    static Create<T extends IEndpoint<IResponse>>(Type:{new(subscriptions:EndpointsSubjects):T}): T{
        let endpoint = AppModule.injectorInstance.get(Type,new Error("endpoint not found")); //depricated
        if(endpoint === "endpoint not found")
            throw endpoint
        return endpoint;
    }
}