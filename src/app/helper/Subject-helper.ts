import { BehaviorSubject, Observable } from "rxjs";
import { IResponse } from "../models/IResponse";

export class SubjectHandler<T>{

    subject: BehaviorSubject<T>

    constructor(subjectObj:T){
        this.subject = new BehaviorSubject(subjectObj)
    }

    getSubjectObservable():Observable<T>{
        return this.subject.asObservable()
    }

    updateSubject(TypeData:T){
        this.subject.next(TypeData)
    }
}