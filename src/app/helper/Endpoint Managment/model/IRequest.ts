import { MethodType } from "./method_type";

export abstract class IRequest{
    requestId! :number;
    isSubscribe!: boolean;
    methodType!: MethodType;
}