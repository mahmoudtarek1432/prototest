export class RequestIdHandler{
    static RequestId: number = 0
    static generateRequestId():number{
        this.RequestId++ //new requestId Incremented
        return this.RequestId;
    }
}