import { ResultCode } from "./result-code";
import { Error } from "./error";
import { navi } from "./navi";


export abstract class IResponse extends navi {
    requestId= 0;
    resultCode= 0;
    errors = new Array<Error>();
}
