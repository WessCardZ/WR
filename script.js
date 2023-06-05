async function getOne(uri) {
    const encodedURI = encodeURI(uri);
    const response = await fetch(encodedURI);
    return await response.json();
}


async function carregarUsuario() {
    const usuario = await getOne('https://randomuser.me/api/?nat=BR');

    let nomeP = document.getElementById('name').value = usuario.results[0].name.first;
    let nomeU = document.getElementById('name').value = usuario.results[0].name.last;

    let nomeC = `${nomeP} ${nomeU}`

    document.getElementById('foto').src = usuario.results[0].picture.large;
    document.getElementById('name').innerText = nomeC
    document.getElementById('email').innerText = usuario.results[0].email;
    document.getElementById('phone').innerText = usuario.results[0].phone;
    document.getElementById('age').innerText = usuario.results[0].registered.age;

    let city = document.getElementById('estado').value = usuario.results[0].location.city;
    let state = document.getElementById('estado').value = usuario.results[0].location.state;

    let cidade = `${city}`
    let estados = `${state}`


    /// script de mudança de nomes ///

    /// Primeiro IF Verifica se um dos nomes é MATO GROSSO ou PARAIBA para apenas pegar as 2 letras especificas
    if (estados.toLowerCase() === 'mato grosso' ||
        estados.toLowerCase() === 'paraíba' ||
        estados.toLowerCase() === 'amapá') {

        if (estados.toLowerCase() === 'mato grosso') {
            document.getElementById('estado').innerText = `${cidade}/MT`
        }
        else if (estados.toLowerCase() === 'paraíba') {
            document.getElementById('estado').innerText = ` ${cidade}/PB`
        }
        else {
            document.getElementById('estado').innerText = ` ${cidade}/AP`
        }
    }
    /// O Else IF verifica se os nomes tem espaço, se tiver ele pega a primeira letra do primeiro nome, e a primeira letra do ultimo nome
    else if (estados.indexOf(" ") !== -1) {
        let prNome = estados.indexOf(" ")
        let ultNome = estados.lastIndexOf(" ")

        let saida =
            estados.substr(0, prNome).charAt(0).toUpperCase() +
            estados.substr(ultNome).charAt(1).toUpperCase();

        document.getElementById('estado').innerText = `${cidade}/${saida}`

    }
    /// O else faz o contrario do Else IF, se não tiver espaço, ele pega as 2 primeiras letras do nome
    else {
        let tam = estados.length
        let prLetra = estados.charAt(0)
        let sgLetra = estados.charAt(1)

        let saida = prLetra + sgLetra

        document.getElementById('estado').innerText = `${cidade}/${saida.toUpperCase()}`
    }


}
