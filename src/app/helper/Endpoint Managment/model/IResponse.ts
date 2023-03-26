import { ResultCode } from "./result-code";
import { Error } from "./error";

export abstract class IResponse {
    requestId!: number;
    resultCode!: ResultCode;
    errors = new Array<Error>();
}