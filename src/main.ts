import { exibirMenu } from './view/terminalView';
function main() {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  exibirMenu();
}

main();
//1- Terminal apresenta um erro na apartir da 3° ou 4° interação, o terminal congela no terminal.question
//Acredito que seja erro de buffer de teclado...
//2- Falta melhorar tratamento/validações de dados
//3- Falta corrigir as tratativas de erros...
