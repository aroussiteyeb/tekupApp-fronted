import { Role } from "./roles";

export class Member{
    constructor(private idUser : any, private role : Role){}

    public getIdUser(){
        return this.idUser;
    }

    public getRole(){
        return this.role;
    }

    public setRole(role: Role){
        this.role = role;
    }

}
