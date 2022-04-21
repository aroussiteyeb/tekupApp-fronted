export class Post{
    constructor(
        private id : any,
        private idUser : string,
        private creationDate : Date,
        private editDate : Date,
        private text ?: string,
        private imgUrl ?: string,
    ){}

    public getId() : any {
        return this.id;
    }

    public getCreationDate(){
        return this.creationDate;
    }

    public getEditDate(){
        return this.editDate;
    }

    public setEditDate(date : Date){
        this.editDate = date;
    }

    public getIdUser() :any{
        return this.idUser;
    }

    public getText() : string{
        return this.text?this.text:"";
    }

    public setText(text :string){
        this.text = text;
    }

    public getImgUrl():string{
        return this.imgUrl?this.imgUrl:"";
    }
    
    public setImgUrl(imgUrl : string){
        this.imgUrl = imgUrl
    }
}