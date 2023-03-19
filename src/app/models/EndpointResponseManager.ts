import { ProtobufType } from "src/ProtoWraper/ProtoBufType"

export class ResponseManager{
    Errors?: string[]
    Message?: string[]
    Code?:number
    Data!:ProtobufType[]

    constructor(data:ProtobufType[]){
        this.Data = data
    }
}