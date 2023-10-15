import { MethodType } from "./method_type";
import { navi } from "./navi";

export abstract class IRequest extends navi{
    request_id! :string;
    is_subscribe!: boolean;
    method_type!: MethodType;
}