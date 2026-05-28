import {writeFile, readFile} from "node:fs/promises"; //file system, escrever em arquivos

export async function lerArquivo(){
    try {
        const usuariosString = await readFile('./src/database/database.json', {encoding:"utf-8"});
        return JSON.parse(usuariosString);
    } catch (error) {
        console.error(`Arquivo corrompido, não foi possível ler os dados. [${error.message}]`); 
    }
}

function verificarUsuarioExistente(usuarios, user){
    let usuarioExiste = false;
    usuarios.forEach((usuario) => {
        if(usuario.login === user.login){usuarioExiste = true;}
    });
    return usuarioExiste;
}

export async function salvarUsuario(user){
    const usuarios = await lerArquivo();

    if(!usuarios){ //se não tiver nada dentro do arquivo
        await writeFile('./src/database/database.json', JSON.stringify([user]), {encoding:"utf-8"}); //./ -> apartir daqui
        return; //early return, p/ sair da função
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

export async function removerUsuario(user){
    const usuarios = await lerArquivo();
    if(!usuarios){ return false;}

    const indice = usuarios.findIndex((item)=>{
        return item.login === user?true:false;
    });

    if(indice !== -1){
        usuarios.splice(indice,1);
        await writeFile('./src/database/database.json', JSON.stringify(usuarios), {encoding:"utf-8"}); 
        return true;
    }
    return false;
}