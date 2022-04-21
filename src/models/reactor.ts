import { EventReaction } from "./eventReaction";

export class Reactor{
    constructor(
        private reactorId : any,
        private reaction : EventReaction){
    }

    public getReactorId(){
        return this.reactorId;
    }

    public getReaction(){
        return this.reaction;
    }

    public setReaction(reaction : EventReaction){
        this.reaction = reaction;
    }
}