import {stdin, stdout} from "process";
import {createInterface} from "node:readline/promises";
import {writeFile, readFile} from "node:fs/promises"; //file system, escrever em arquivos

async function buscarUsuario(username){
    try{
        const response = await fetch(`https://api.github.com/users/${username}`); 
        if(!response.ok){throw new Error("Algo deu errado.");}

        const json = await response.json();
        return json; //json é o nosso usuário
    }catch(error){
        console.log(error);
    }
}

async function lerArquivo(){
    try {
        const usuariosString = await readFile('./database.json', {encoding:"utf-8"});
        return JSON.parse(usuariosString);
    } catch (error) {
        console.error(`Arquivo corrompido, não foi possível ler os dados. [${error.message}]`);
    }
}

async function verificarUsuarioExistente(usuarios, user){
    let usuarioExiste = false;
    await usuarios.forEach((usuario) => {
       if(usuario.login === user.login){usuarioExiste = true;}
    });
    return usuarioExiste;
}

async function salvarUsuario(user){
    const usuarios = await lerArquivo();

    if(!usuarios){ //se não tiver nada dentro do arquivo
        await writeFile('./database.json', JSON.stringify([user]), {encoding:"utf-8"}); //./ -> apartir daqui
        return; //early return, p/ sair da função
    }

    //Antes de salvar, verificar se o usuário já existe
    const usuarioExistente = await verificarUsuarioExistente(usuarios, user);

    if(!usuarioExistente){
        usuarios.push(user);
        await writeFile('./database.json', JSON.stringify(usuarios), {encoding:"utf-8"}); 
    }else{
        console.log("Usuário já existe.");
    }

}

async function main(){
    const terminal = createInterface(stdin, stdout);
    const nome = await terminal.question("Digite um nome de usuário do GitHub: ");
    const user = await buscarUsuario(nome);
    await salvarUsuario(user);
    
    //console.log(user);  
    //console.log(user.login); 
    //console.log(user.html_url)
    
    terminal.close();
}

main();