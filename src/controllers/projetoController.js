import {buscarUserGithub} from "../services/githubService.js";
import {salvarUsuario, lerArquivo, removerUsuario} from "../services/arquivoService.js";

export async function buscarDevController(dev){
    const user = await buscarUserGithub(dev);
    //if(!user){return 0;} //Usuário não encontrado
    return user;
}

export async function salvarDevController(dev){
    const sucesso = await salvarUsuario(dev);
    return sucesso;
}

export async function verEquipeController(){
    const listaUsers = await lerArquivo();
    return listaUsers;
}

export async function removerEquipeController(nomeRemover){
    const resposta = await removerUsuario(nomeRemover);
    return resposta;
}