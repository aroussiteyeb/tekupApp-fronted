export class Eventt{
    constructor(
        public id : string,
        public idUser : string,
        public creationDate : Date,
        public title : string,
        public text ?: string,
        public imgUrl ?: string,
        public userName ?:string,
        public userPic ?:string,
        public interested ?:any,
        public notInterested ?:any,
        public going?:any,
        public userIntercation?:any
        
    ){}

    }