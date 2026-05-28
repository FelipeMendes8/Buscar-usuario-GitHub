export async function buscarUserGithub(username){
    try{
        const response = await fetch(`https://api.github.com/users/${username}`); 
        //if(!response.ok){throw new Error("Algo deu errado.");} //deixarei a view lidar com isso por agora

        const json = await response.json();
        return json; //json é o nosso usuário
    }catch(error){
        console.log(error);
    }
}