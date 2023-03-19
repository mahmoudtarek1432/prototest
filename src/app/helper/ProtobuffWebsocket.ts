import { ProtoHelper } from "./proto-helper";
import { websocketHelper } from "./WebsocketHelper";

export class ProtobufWebsocket{
    async sendEncoded(
        fileName: string,
        packageName: string,
        className: string,
        payload: object){

        let encodedMsg = await ProtoHelper.encode(fileName,packageName,className,payload);
        websocketHelper.SendWebsocketMessage(encodedMsg);
    }

    async reciveDecoded<T>(
        fileName: string,
        packageName: string,
        className: string){
        
        return websocketHelper.ReciveWebsocketMessage<T>(async (ev)=>{
            let message = ev.data //data from server
            return await ProtoHelper.decode<T>(fileName,packageName,className,message)
        });
    }
}