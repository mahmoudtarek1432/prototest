import { AppModule } from "../app.module";

/**
 * resolves Dependency Injection services outside of angular instantances
 */
export class ServiceResolver<T>{
    /*resolve(type:{new ():T}):T{
        return AppModule.injectorInstance.get<T>(type)
    }*/
}