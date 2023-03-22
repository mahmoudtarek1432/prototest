import { Observable } from "rxjs";

export interface EndpointsSubjects{
    //gets created upon request, marks a request was fired
    createNewsubject<T>(EndpointResponseName:string | number, subjectType:T):void;

    /**
     * updates a subject, sends new message to subscribers according to the given requestId
     */
    updateSubject<T>(EndpointResponseName:string | number, subjectType:T):void;

    /**
     * Returns an Observable of a generic type
     */
    getSubjectObservable<T>(EndpointResponseName:string | number): Observable<T>;
}
