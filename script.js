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

    document.getElementById('nat').innerText = usuario.results[0].nat;
    document.getElementById('cpf').innerText = usuario.results[0].id.value;
    document.getElementById('name').innerText = nomeC
    document.getElementById('email').innerText = usuario.results[0].email;
    document.getElementById('phone').innerText = usuario.results[0].phone;
    document.getElementById('age').innerText = usuario.results[0].dob.age;

    // esse IF serve para traduzir os generos de ingles para português

    let gender = document.getElementById('gender').value = usuario.results[0].gender;

    if (gender == `male`) {
        document.getElementById('gender').innerText = 'Homem'
    }
    else {
        document.getElementById('gender').innerText = 'Mulher'
    }
    // Esse é o fim do IF

    let city = document.getElementById('state').value = usuario.results[0].location.city;
    let state = document.getElementById('state').value = usuario.results[0].location.state;

    /// Primeiro IF Verifica se um dos nomes é MATO GROSSO ou PARAIBA para apenas pegar as 2 letras especificas
    if (state.toLowerCase() === 'mato grosso' ||
        state.toLowerCase() === 'paraíba' ||
        state.toLowerCase() === 'amapá') {

        if (state.toLowerCase() === 'mato grosso') {
            document.getElementById('state').innerText = `${city}/MT`
        }
        else if (state.toLowerCase() === 'paraíba') {
            document.getElementById('state').innerText = ` ${city}/PB`
        }
        else {
            document.getElementById('state').innerText = ` ${city}/AP`
        }
    }
    /// O Else IF verifica se os nomes tem espaço, se tiver ele pega a primeira letra do primeiro nome,
    ///  e a primeira letra do ultimo nome.
    else if (state.indexOf(" ") !== -1) {
        let prNome = state.indexOf(" ")
        let ultNome = state.lastIndexOf(" ")

        let saida =
            state.substr(0, prNome).charAt(0).toUpperCase() +
            state.substr(ultNome).charAt(1).toUpperCase();

        document.getElementById('state').innerText = `${city}/${saida}`

    }
    /// O else faz o contrario do Else IF, se não tiver espaço, ele pega as 2 primeiras letras do nome
    else {
        let prLetra = state.charAt(0)
        let sgLetra = state.charAt(1)

        let saida = prLetra + sgLetra

        document.getElementById('state').innerText = `${city}/${saida.toUpperCase()}`
    }


}
