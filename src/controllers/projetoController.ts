import { UsuarioGitHub } from '../models/usuario-github.js';
import { salvarUsuario, lerArquivo, removerUsuario } from '../services/arquivoService.js';
import { buscarUserGithub } from '../services/githubService.js';

export async function buscarDevController(nome: string) {
  const user = await buscarUserGithub(nome);
  //if(!user){return 0;} //Usuário não encontrado
  return user;
}

export async function salvarDevController(dev: UsuarioGitHub) {
  const sucesso = await salvarUsuario(dev);
  return sucesso;
}

export async function verEquipeController() {
  const listaUsers = await lerArquivo();
  return listaUsers;
}

export async function removerEquipeController(nomeRemover: string) {
  const resposta = await removerUsuario(nomeRemover);
  return resposta;
}
