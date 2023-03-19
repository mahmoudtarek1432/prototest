export abstract class IResponse {
    requestId: number|null = null;
    errors = new Array<Error>();
}