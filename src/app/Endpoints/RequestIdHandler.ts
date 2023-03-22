export class RequestIdHandler{
    static RequestId: number
    static generateRequestId():number{
        this.RequestId++ //new requestId Incremented
        return this.RequestId;
    }
}