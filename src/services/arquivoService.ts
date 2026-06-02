import {writeFile, readFile} from "node:fs/promises"; //file system, escrever em arquivos
import { UsuarioGitHub } from "../models/usuario-github";

export async function lerArquivo():Promise<UsuarioGitHub[]>{
    try {
        const usuariosString = await readFile('./src/database/database.json', {encoding:"utf-8"});
        return JSON.parse(usuariosString);
    }catch{
        console.error("Arquivo inválido, não foi possível ler os dados.");
        return [];//sem isso, pode gerar erro undefined
        //Tratativa com base em: https://github.com/ailemsnt/busca_perfil_ts/blob/main/src/services/arquivoService.ts
    }
}

function verificarUsuarioExistente(usuarios:UsuarioGitHub[], user:UsuarioGitHub):boolean{
    let usuarioExiste = false;
    usuarios.forEach((usuario) => {
        if(usuario.getLogin === user.getLogin){usuarioExiste = true;}
    });
    return usuarioExiste;
}

export async function salvarUsuario(user:UsuarioGitHub):Promise<boolean>{
    const usuarios = await lerArquivo();
    console.log(usuarios);

    if(!usuarios){ //se não tiver nada dentro do arquivo
        await writeFile('./src/database/database.json', JSON.stringify([user]), {encoding:"utf-8"}); //./ -> apartir daqui
        return false; //early return, p/ sair da função
    }

    //Antes de salvar, verificar se o usuário já existe
    const usuarioExistente = await verificarUsuarioExistente(usuarios, user);

    if(!usuarioExistente){
        usuarios.push(user);
        await writeFile('./src/database/database.json', JSON.stringify(usuarios), {encoding:"utf-8"}); 
        return true;
    }else{
        return false;
    }
}

export async function removerUsuario(user:string){
    const usuarios = await lerArquivo();
    if(!usuarios){ return false;}

    const indice = usuarios.findIndex((item)=>{
        return item.getLogin === user?true:false;
    });

    if(indice !== -1){
        usuarios.splice(indice,1);
        await writeFile('./src/database/database.json', JSON.stringify(usuarios), {encoding:"utf-8"}); 
        return true;
    }
    return false;
}