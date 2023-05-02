import { MethodType } from "./method_type";

export abstract class IRequest{
    request_id! :string;
    is_subscribe!: boolean;
    method_type!: MethodType;
}