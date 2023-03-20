export abstract class IResponse {
    responseId!: number
    errors = new Array<Error>();
}