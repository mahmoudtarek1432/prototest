import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IResponse } from "../models/IResponse";

export class SubjectHandler<T>{

    subject: Subject<T>

    constructor(subjectObj:T){
        this.subject = new (Subject)
    }

    getSubjectObservable():Observable<T>{
        return this.subject.asObservable()
    }

    updateSubject(TypeData:T){
        this.subject.next(TypeData)
    }
}