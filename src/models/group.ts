import { Member } from "./member";

export class Group{

    constructor(
        private name : string,
        private memberList : Member[],  
        private about : string){
        }

    public getName(){
        return this.name;
    }

    public setName(name : string){
        this.name = name;
    }

    public getMembersList(){
        return this.memberList;
    }

    public addMember(member : Member){
        this.memberList.push(member);
    }

    public removeMember(id : any){
        let index = this.memberList.findIndex(member => member.getIdUser() == id);
        this.memberList.splice(index,1);
    }

    public getMemberCount(){
        return this.memberList.length;
    }

    public getAbout(){
        return this.about;
    }

    public setAbout(about : string){
        this.about = about;
    }

}