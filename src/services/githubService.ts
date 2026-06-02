import { UsuarioGitHub } from "../models/usuario-github";
import { UsuarioGitHubValidator } from "../validators/usuario-github-validator";

export async function buscarUserGithub(username:string): Promise<UsuarioGitHub> {
    try{
        const response = await fetch(`https://api.github.com/users/${username}`); 
        if(!response.ok){throw new Error("Algo deu errado.");} 
        
        return UsuarioGitHubValidator.validate(await response.json());
    }catch(error:unknown){
        if(!(error instanceof Error)){
            throw error;
        }
        if(error.name === "TypeError"){
            throw new Error("Erro de conexão com o GitHub.");
        }
        throw error;
    }
}