import { Globals } from "src/Shared/Globals";

export class websocketHelper {

    public static websocketPort:WebSocket

    constructor(private globals:Globals){

    }

    public static getInstance():WebSocket{

        if(this.websocketPort)
            return this.websocketPort;
        this.websocketPort = new WebSocket(Globals.wsUrl);
        return this.websocketPort;
    }

    static ReciveWebsocketMessage<T>(message:(event:MessageEvent<any>)=>any){
        websocketHelper.getInstance()
        return websocketHelper.websocketPort.onmessage = (ev)=>{
            return message(ev);
        }
    }

    static SendWebsocketMessage(data:string|Blob|ArrayBufferLike|ArrayBuffer){
        websocketHelper.getInstance()
        this.websocketPort.send(data)
    }
}

export interface IwebsocketHelper{
    ReciveWebsocketMessage(message:(event:MessageEvent<any>)=>void):void;
    SendWebsocketMessage(data:string|Blob|ArrayBufferLike|ArrayBuffer):void;
}