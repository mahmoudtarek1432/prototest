import { AuthEndpoint } from "src/app/Endpoints/AuthEndpoint";
import { loginEndpoint } from "src/app/Endpoints/LoginEndopoint";
import { ResponseManager } from "src/app/models/EndpointResponseManager";
import { LoginResponse } from "src/app/models/login-request";
import { ResponseEndpointHelper } from "./ResponseEndpointHelper";

export class ResponseService{
    responseHelper: ResponseEndpointHelper = new ResponseEndpointHelper()
    
    constructor(){
        this.responseHelper.AddResponseEndpoint(LoginResponse, new loginEndpoint().handleLogin)
    }
    //function called by websocketHandler
}

class ResponsePool{
    Endpoints = {
        1 : new loginEndpoint().handleLogin,
        2 : new AuthEndpoint().handleLogin
    };
}