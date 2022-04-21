import { Post } from "./post";
import { Reactor } from "./reactor";

export class Event extends Post{

    constructor(
        private name : string,
        private endDate : Date,
        private startDate : Date,
        private reactorsList : Reactor[], 
        id : any, 
        idUser : string, 
        creationDate : Date,
        editDate : Date,
        text?: string, 
        imgUrl ?:string) {
            super(id,idUser,creationDate,editDate,text,imgUrl);
    }

    public getName(){
        return this.name;
    }

    public setName(name : string){
        this.name = name;
    }

    public getReactorsList(){
        return this.reactorsList;
    }

    public addReactor(reactor : Reactor){
        this.reactorsList.push(reactor);
    }

    public getEndDate() : Date{
        return this.endDate;
    }

    public setEndDate(endDate : Date){
        this.endDate = endDate;
    }

    public getStartDate(){
        return this.startDate;
    }

    public setStartDate(startDate : Date){
        this.startDate = startDate;
    }
    
}