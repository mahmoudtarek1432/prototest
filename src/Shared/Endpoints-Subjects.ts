import { BehaviorSubject, Observable } from "rxjs";
import { SubjectHandler } from "src/app/helper/Subject-helper";
import { LoginRequest } from "src/app/models/login-request";
import { LoginResponse } from "src/app/models/login-response";

/**
 * class shall be passed as a dependency for providing a singleton instance
 */
export class EndpointsSubjects{
    subjectHandlers:{[Key:string] : SubjectHandler<any>} = {};

    //gets created upon request, marks a request was fired
    createNewsubject<T>(Key:string, subjectType:T){
        let subject = this.subjectHandlers[Key];
        if(subject == undefined)
            this.subjectHandlers[Key] = new SubjectHandler<T>(subjectType)
    }

    /**
     * updates a subject, sends new message to subscribers according to the given requestId
     */
    updateSubject<T>(Key:string, subjectType:T){
        let subject = this.subjectHandlers[Key];
        if(subject == undefined)
            throw Error("subject Not Found")
        subject.updateSubject(subjectType)
    }

    /**
     * Returns an Observable of a generic type
     */
    getSubjectObservable<T>(Key:string): Observable<T>{
        let subject = this.subjectHandlers[Key];
        if(subject)
            return this.subjectHandlers[Key].getSubjectObservable()
        throw Error("subject Not Found")
    }

}
