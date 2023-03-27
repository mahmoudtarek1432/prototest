export class ProtoFileStringManipulation{

    public static ConvertProtofile(protoFile: string, type: "request" | "response"){
        //prepend the protopackage and syntax fields
        protoFile = "syntax = \"proto3\";\
                    package ResponseEndpoint;\ "
                    + protoFile;

        let lastNumber = ProtoFileStringManipulation.ExtractLastMemberNumber(protoFile);
         //get the file without last bracket
        let lastBracket = protoFile.lastIndexOf("}");
        protoFile = protoFile.slice(0,lastBracket);
        
        switch (type){
            case "request":
                protoFile = protoFile + this.RequestMessageAdditions(lastNumber);
                break;
            case "response":
                protoFile = protoFile + this.ResponseMessageAdditions(lastNumber);
                break;
        }

        protoFile = protoFile + "}";
        return protoFile;
    }

    public static ExtractMessageName(protoFile:string):string{
        let messageName = "";
        let firstChar = protoFile.indexOf("message")+ "message".length;
        let MessageNamefirstChar = firstChar;

        //eliminate spaces
        while(protoFile[MessageNamefirstChar] == " "){
            MessageNamefirstChar++;
        }

        //extract message name
        for (let i = MessageNamefirstChar; i < protoFile.length; i++){
            if(protoFile[i] == " " || protoFile[i] == "{"){ //first encountered after message name
                break;
            }
            messageName = messageName + protoFile[i]
        }
        return messageName
    }

    private static ExtractLastMemberNumber(protoFile:string){
        //itrates from the end to find the last number in file
        let index = protoFile.length-1;
        let found = false
        let lastNumber = ""
        while(index> 0){
            if(found == true){
                if(48 <= protoFile[index].charCodeAt(0) &&  protoFile[index].charCodeAt(0) <= 57){ //if the char is a number between 0 and 9
                    lastNumber = lastNumber + protoFile[index] //appends the located number
                }
                else if(lastNumber != "" && protoFile[index] == " "){ //found a space that isnt before the number
                    break;
                }
                index++;
            }
            else{
                if(protoFile[index] == "="){
                    found = true
                }
                index--;
            }
        }
        return lastNumber
    }

    private static ResponseMessageAdditions(lastNumber: string): string{
        let lastnumberParsed = parseInt(lastNumber);
        const ResponseDecorators = `int32 request_id = ${lastnumberParsed + 1};\
                                    int32 result_code = ${lastnumberParsed + 2};\
                                    repeated error errors = ${lastnumberParsed+ 3};\ `
        
        return ResponseDecorators
    }

    private static RequestMessageAdditions(lastNumber: string): string{
        let lastnumberParsed = parseInt(lastNumber);
        const ResponseDecorators = `int32 requestId = ${lastnumberParsed + 1};\
                                    bool isSubscribe = ${lastnumberParsed + 2};\
                                    int32 methodType = ${lastnumberParsed+ 3};\ `

        return ResponseDecorators
    }
}