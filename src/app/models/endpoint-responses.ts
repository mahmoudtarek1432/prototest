import { CityResponse } from "./city-response";
import { LoginResponse } from "./login-response"
import { ProductResponse } from "./product-response";

export class EndpointResponses {
    loginResponses:LoginResponse[] | undefined;
    productResponses:ProductResponse[] | undefined;
    cityResponses:CityResponse[] | undefined;
}