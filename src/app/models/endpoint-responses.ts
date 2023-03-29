import { ProtobufType } from "src/app/helper/Protobuf/ProtoBufType";
import { CityResponse } from "./city-response";
import { LoginResponse } from "./login-response"
import { ProductResponse } from "./product-response";

//undefined removed
export class ResponseEndpoints{
    city_responses?:CityResponse[]  
    login_responses?:LoginResponse[]
}