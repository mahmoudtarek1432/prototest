import { AuthEndpoint } from "src/app/Endpoints/AuthEndpoint";
import { loginEndpoint } from "src/app/Endpoints/LoginEndopoint";
import { ResponseManager } from "src/app/models/EndpointResponseManager";
import { ResponseEndpointHelper } from "./ResponseEndpointHelper";

export class ResponseService{
    responseHelper!: ResponseEndpointHelper
    //function called by websocketHandler
}

class ResponsePool{
    Endpoints ={
        1 : new loginEndpoint().handleLogin,
        2 : new AuthEndpoint().handleLogin
    }
}