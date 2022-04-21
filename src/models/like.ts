export class Like{
    constructor(
        private id : string,
        private idUser : string,
        private idParent : string,
    ){}

    public getId() : string{
        return this.id;
    }
    
    public getIdUser() : string{
        return this.idUser;
    }

    public getIdParent() : string{
        return this.idParent;
    }
}