import { UsuarioGitHub } from "../models/usuario-github";

export class UsuarioGitHubValidator{
    static validate(response:unknown):UsuarioGitHub{
        
        //Validando se a resposta é um objeto
        if(!this.isObject(response)){throw new Error("Type Error.");}

        //validando se as chaves existem no objeto
        if(!("login" in response)){throw new Error("Key/property Error.");}
        if(!("id" in response)){throw new Error("Key/property Error.");}
        if(!("html_url" in response)){throw new Error("Key/property Error.");}
        if(!("public_repos" in response)){throw new Error("Key/property Error.");}
        if(!("name" in response)){throw new Error("Key/property Error.");}

        //Validando os tipos das chaves
        if(!this.isString(response.login)){throw new Error("Type Error.");}
        if(!this.isNumber(response.id)){throw new Error("Type Error.");}
        if(!this.isString(response.html_url)){throw new Error("Type Error.");}
        if(!this.isNumber(response.public_repos)){throw new Error("Type Error.");}
        
        //Name pode ser null, undefined ou string
        if(response.name !== null || response.name !== undefined){
            if(!this.isString(response.name)){
                throw new Error("Type Error.");
            }
        }
   
        //Chegar aqui é sobreviver, porque passou por todas as validações
        return new UsuarioGitHub(response.login, response.id, response.html_url, response.public_repos, response.name);
    }

    //O retorno da função é booleano, se retornar true, eu garanto que a variável valor é do tipo desejado
    private static isObject(valor:unknown): valor is object{
        return typeof valor === "object" && valor !== null;
    }

    private static isString(valor:unknown):valor is string{
        return typeof valor === "string";
    }

    private static isNumber(valor:unknown):valor is number{
        return typeof valor === "number";
    }
}

/*
A validação é necessário fazer, aqui a gente garante que o objeto que ta retornando da API do GitHUb
tem oque a gente precisa e somente oque a gente precisa. Aqui nós poderiamos validar mais coisas como 
o tamanho da string.
*/