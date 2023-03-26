import { Globals } from "src/Shared/Globals";


/**
 * handles websocket lifecycle processes
 */
export class websocketHelper {

    public static websocketPort:WebSocket

    constructor(private globals:Globals){

    }

    /**
     * handle websocket instance creation as a singleton
     * 
     * @param websocketUrl - websocket Url in the form: wss//localhost:port
     * @returns a websocket connection
     */
    public static getInstance():WebSocket{

        if(this.websocketPort)
            return this.websocketPort;
        let socket = new WebSocket(Globals.wsUrl);
        this.websocketPort = socket
        socket.onopen = ev => {
            console.log(ev)
        }
        return this.websocketPort;
    }

        /**
     * Process the incoming on message Events
     * @param message - callback function that handles incoming websocket messages
     */
    static ReciveWebsocketMessage<T>(message:(event:MessageEvent<any>)=>any){
        websocketHelper.getInstance()
        return websocketHelper.websocketPort.onmessage = (ev)=>{
            return message(ev);
        }
    }

    /**
     * 
     * @param data send data in the form of string|Blob|ArrayBufferLike
     */
    static SendWebsocketMessage(data:string|Blob|ArrayBufferLike|ArrayBuffer){
        websocketHelper.getInstance()
        this.websocketPort.send(data)
    }
}