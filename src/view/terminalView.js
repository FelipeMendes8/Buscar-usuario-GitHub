import {stdin, stdout} from "process";
import {createInterface} from "node:readline/promises";
import {
    buscarDevController, 
    salvarDevController, 
    verEquipeController,
    removerEquipeController
} from "../controllers/projetoController.js";

export async function exibirMenu(){

    while(true){
        console.log("[Menu]\n1- Buscar Dev\n2- Ver Equipe\n3- Remover Dev\n4- Sair");
        const terminal = await createInterface(stdin, stdout);
        const opcao = await terminal.question("Digite uma opção: ");

        if(opcao === "4"){
            console.log("Saindo...");
            terminal.close();
            break; //Este break encerra o loop
        }
        
        switch(opcao){
            case "1":
                const nome = await terminal.question("Digite um nome de usuário do GitHub: ");
                const user = await buscarDevController(nome);
                if(user.message === "Not Found" && user.status === "404"){console.log("Usuário não encontrado."); break;}
                
                //console.log(user);  
                console.log("----------------------------------------");
                console.log("Usuário encontrado no GitHub:");
                console.log(`Nome: ${user.login}`); 
                console.log(`Link: ${user.html_url}`);  
                console.log(`Repositórios públicos: ${user.public_repos}`); 
                console.log("----------------------------------------");
                
                let resposta = await terminal.question("Deseja salvar este usuário na equipe? (s/n) ");
                
                while(resposta.toLowerCase() !== "s" && resposta.toLowerCase() !== "n"){
                    console.log("Resposta inválida. Digite 's' para sim ou 'n' para não.");
                    resposta = await terminal.question("Deseja salvar este usuário na equipe? (s/n) ");
                }
                
                if(resposta === "s"){
                    const resultado = await salvarDevController(user);
                    if(resultado){
                        console.log("Usuário salvo com sucesso.");
                    }
                    if(resultado === false){
                        console.log("Usuário já existe na equipe.");
                    }
                }
                
                break; //Este break encerra o switch
            case "2":
                const listaUsers = await verEquipeController();

                if(!listaUsers || listaUsers.length ===0){
                    console.log("Nenhum usuário foi salvo na equipe."); break;
                }
                console.log("----------------------------------------");
                console.log("[Lista de desenvolvedores]\n");
                listaUsers.forEach((user, index)=>{
                    console.log(`${index+1}: ${user.login} | ${user.html_url}`);
                });
                console.log("----------------------------------------");

                break;
            case "3":
                const nomeRemover = await terminal.question("Digite o nome do usuário para remover da equipe: ");
                const remover = await removerEquipeController(nomeRemover);

                if(!remover){console.log("O usuário não foi encontrado na equipe.");}
                if(remover){console.log("O usuário foi removido com sucesso.");}
                
                break;
            default:
                console.log("Opção inválida. Digite um número entre 1 e 4."); 
                break;  
        }
        terminal.close();
    }
}
