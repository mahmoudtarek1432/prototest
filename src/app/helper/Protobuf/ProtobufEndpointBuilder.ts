import { IRequest } from '../Endpoint Managment/model/IRequest';
import { EndpointType, ProtoFileStringManipulation } from './ProtoFileStringManipulation';
import { IResponse } from '../Endpoint Managment/model/IResponse';
import { navi } from '../Endpoint Managment/model/navi';

export class ProtobufEndpointBuilder{

    private  static protoResponseFiles: Array<ProtoDetails> = new Array<ProtoDetails>();
    private  static protoRequestFiles: Array<ProtoDetails> = new Array<ProtoDetails>();

    static addProtoEndpoint(protoFile:string, type: EndpointType){
        let messageName = ProtoFileStringManipulation.ExtractMessageName(protoFile);

        let ExtendedProtoFile = ProtoFileStringManipulation.ConvertProtofile(protoFile,type);

        let fileDetails = new ProtoDetails();
        fileDetails.messageName = messageName;
        fileDetails.protoFileBody = ExtendedProtoFile;

        switch(type){
            case EndpointType.request:
                ProtobufEndpointBuilder.protoRequestFiles.push(fileDetails);
                break;
            case EndpointType.response:
                ProtobufEndpointBuilder.protoResponseFiles.push(fileDetails);
                break;
        }
    }

    static addEndpointModelbyClass<T>(modelClass: {new():T}, type: EndpointType){
       var t = new modelClass ()
       
       Object.getOwnPropertyNames(t).map(n =>{
        let v = n as keyof typeof modelClass
        if(typeof t[v] == "object"){
            //the passed variable is an object
            console.log(Object.getOwnPropertyNames(t[v]))
        }
        else{
            
        }

       })
    }

    /// there shall be a response endpoint and request endpoint
    static buildResponseEndpoint(){
        let endpoint ="syntax = \"proto3\";\
                       package Endpoint;\
                       message ResponseEndpoints {\ "; 
        //push messages from array
        this.protoResponseFiles.forEach((file,i) =>{
            let FieldName = ProtoFileStringManipulation.configureMessageName(file.messageName)+"s";
            endpoint = endpoint + `repeated ${file.messageName} ${FieldName} = ${i+1};\ `;
        })

        endpoint = endpoint + " }\ ";   

        this.protoResponseFiles.forEach((details) =>{
            endpoint = endpoint + details.protoFileBody + '\ ';
        })

        const error = "message error{\
            string message = 1;\
        }\ "

        endpoint = endpoint + error;
        console.log(endpoint)
        return endpoint;        
    }

    static buildRequestEndpoint(){
        let endpoint ="syntax = \"proto3\";\
                       package Endpoint;\
                       message RequestEndpoints {\ ";
        //push messages from array
        this.protoRequestFiles.forEach((file,i) =>{
            let FieldName = ProtoFileStringManipulation.configureMessageName(file.messageName)+"s";
            endpoint = endpoint + `repeated ${file.messageName} ${FieldName} = ${i+1};\ `;
        })

        endpoint = endpoint + " }\ ";             

        this.protoRequestFiles.forEach((details) =>{
            endpoint = endpoint + details.protoFileBody + '\ ';
        })
        console.log(endpoint)

        return endpoint;        
    }

    /*
     static buildEndpointPackage(){
        let endpoint = "syntax = \"proto3\";\
                       package Endpoint;\ ";
        endpoint += this.buildResponseEndpoint();

        endpoint += this.buildRequestEndpoint();

        endpoint += '}'
        return endpoint
    }

    /// there shall be a response endpoint and request endpoint
    static buildResponseEndpoint(){
        let endpoint ="message ResponseEndpoints {\ "; 
        //push messages from array
        this.protoResponseFiles.forEach((file,i) =>{
            let FieldName = ProtoFileStringManipulation.configureMessageName(file.messageName)+"s";
            endpoint = endpoint + `repeated ${file.messageName} ${FieldName} = ${i+1};\ `;
        })

        endpoint = endpoint + " }\ ";   

        this.protoResponseFiles.forEach((details) =>{
            endpoint = endpoint + details.protoFileBody + '\ ';
        })

        const error = "message error{\
            string message = 1;\
        }\ "

        endpoint = endpoint + error;
        console.log(endpoint)

        return endpoint;        
    }

    static buildRequestEndpoint(){
        let endpoint ="message RequestEndpoints {\ ";
        //push messages from array
        this.protoRequestFiles.forEach((file,i) =>{
            let FieldName = ProtoFileStringManipulation.configureMessageName(file.messageName)+"s";
            endpoint = endpoint + `repeated ${file.messageName} ${FieldName} = ${i+1};\ `;
        })

        endpoint = endpoint + " }\ ";             

        this.protoRequestFiles.forEach((details) =>{
            endpoint = endpoint + details.protoFileBody + '\ ';
        })
        console.log(endpoint)

        return endpoint;        
    }
    
    */
}

class ProtoDetails{
    messageName = ''
    protoFileBody = ''
}
