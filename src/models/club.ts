import { Group } from "./group";
import { Event } from "./event";

export class Club extends Group{
    constructor(
        name : string, 
        membersList : any,
        about : string,
        private events : Event[])
    {
        super(name,membersList,about);
    }

    public getEvents(){
        return this.events;
    }

    public addEvent(event : Event){
        this.events.push(event);
    }

    public setEvent(ev : Event){
        let index = this.events.findIndex(event => event.getId() == ev.getId());
        this.events.splice(index,1);
    }
        
}