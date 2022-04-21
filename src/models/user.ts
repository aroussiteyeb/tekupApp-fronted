export class User{
    constructor(
        private name : string,
        private lastName : string,
        private email : string,
        private password : string,
        private authenticated : boolean,
        private imgUrl ?: string,
        ){}
    public getName() : string{
        return this.name
    }

    public setName(name: string){
        this.name = name
    }

    public getLastName() : string{
        return this.lastName
    }

    public setLastName(lastName: string){
        this.lastName = lastName;
    }

    public getEmail() : string{
        return this.email
    }

    public setEmail(email: string){
        this.email = email
    }


    public getPassword() : string{
        return this.password
    }

    public setPassowrd(pwd: string){
        this.password = pwd
    }

    public getImgUrl() : string{
        return this.imgUrl?this.imgUrl:"";
    }

    public setImgUrl(imgUrl: string){
        this.imgUrl = imgUrl
    }

    public isAuthenticated() : boolean{
        return this.authenticated;
    }

    public setAuthenticated(auth: boolean){
        this.authenticated = auth
    }
    
}