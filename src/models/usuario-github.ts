export class UsuarioGitHub{
    constructor(
        private login:string, 
        private id:number, 
        private html_url:string,
        private public_repos:number,
        private name:string | null
    ){
        //Aqui não é necessário fazer o this.login = login; ...
    }

    get getLogin():string{return this.login;}
    get getId():number{return this.id;}
    get htmlURL():string{return this.html_url;}
    get getPublicRepos():number{return this.public_repos;}
    get getName():string | null{return this.name;}
}
