import {createInterface} from "node:readline/promises";
import {stdin, stdout} from "process"; //standardin e standardout = entrada e saída padrão (é o terminal de qualquer executável)

async function main(){
    const terminal = createInterface(stdin, stdout);
    
    const nome = await terminal.question("Digite um nome de usuário do GitHub: ");
    
    //Node tem a função fetch que retorna uma response (resposta) em JSON
    const response = await fetch(`https://api.github.com/users/${nome}`); //requisição
    const json = await response.json();
   
    console.log(json);  //para ver o objeto completo
    //console.log(json.login); //Para ver um dado específico do objeto
    //console.log(json.html_url)
    
    terminal.close();
}

main();