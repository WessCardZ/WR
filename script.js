async function getOne(uri) {
    const encodedURI = encodeURI(uri);
    const response = await fetch(encodedURI);
    return await response.json();
}

async function carregarUsuario() {
    const usuario = await getOne('https://randomuser.me/api/?nat=BR&results=15');

    const usuariosContainer = document.getElementById('usuarios-container');

    for (let i = 0; i < usuario.results.length; i++) {
        adicionarLinhas(usuariosContainer, usuario, i)
    }

}

function converterEstado(estados) {

    /// Primeiro IF Verifica se um dos nomes é MATO GROSSO ou PARAIBA para apenas pegar as 2 letras especificas
    if (estados.toLowerCase() === 'mato grosso' ||
        estados.toLowerCase() === 'paraíba' ||
        estados.toLowerCase() === 'amapá') {

        if (estados.toLowerCase() === 'mato grosso') {
            estados = `MT`;
        }
        else if (estados.toLowerCase() === 'paraíba') {
            estados = `PB`;
        }
        else {
            estados = `AP`
        }
    }
    /// O Else IF verifica se os nomes tem espaço, se tiver ele pega a primeira letra do primeiro nome,
    ///  e a primeira letra do ultimo nome.
    else if (estados.indexOf(" ") !== -1) {
        let prNome = estados.indexOf(" ")
        let ultNome = estados.lastIndexOf(" ")

        let saida =
            estados.substr(0, prNome).charAt(0).toUpperCase() +
            estados.substr(ultNome).charAt(1).toUpperCase();

        estados = `${saida}`

    }
    /// O else faz o contrario do Else IF, se não tiver espaço, ele pega as 2 primeiras letras do nome
    else {
        let prLetra = estados.charAt(0)
        let sgLetra = estados.charAt(1)

        let saida = prLetra + sgLetra

        estados = `${saida.toUpperCase()}`


    }

    return estados;

}

async function adicionarLinhas(usuariosContainer, usuario, i) {
    const nomeP = usuario.results[i].name.first;
    const nomeU = usuario.results[i].name.last;
    const nomeC = `${nomeP} ${nomeU}`;

    const foto = usuario.results[i].picture.large;
    const nat = usuario.results[i].nat;
    const cpf = usuario.results[i].id.value;
    const email = usuario.results[i].email;
    const telefone = usuario.results[i].phone;
    const idade = usuario.results[i].dob.age;
    const genero = usuario.results[i].gender;
    const cidade = usuario.results[i].location.city;
    const estado = usuario.results[i].location.state;
    const sigla = converterEstado(estado);

    const usuarioDiv = document.createElement('div');
    usuarioDiv.className = 'usuario';

    const fotoImg = document.createElement('img');
    fotoImg.src = foto;
    usuarioDiv.appendChild(fotoImg);

    const nomeCP = document.createElement('p');
    nomeCP.innerHTML = `<strong>Nome:</strong> <span>${nomeC}</span>`;
    usuarioDiv.appendChild(nomeCP);

    const generoP = document.createElement('p');
    generoP.innerHTML = `<strong>Gênero:</strong> <span>${genero === 'male' ? 'Homem' : 'Mulher'}</span>`;
    usuarioDiv.appendChild(generoP);

    const natP = document.createElement('p');
    natP.innerHTML = `<strong>Nacionalidade:</strong> <span>${nat}</span>`;
    usuarioDiv.appendChild(natP);

    const cpfP = document.createElement('p');
    cpfP.innerHTML = `<strong>CPF:</strong> <span>${cpf}</span>`;
    usuarioDiv.appendChild(cpfP);

    const idadeP = document.createElement('p');
    idadeP.innerHTML = `<strong>Idade:</strong> <span>${idade}</span>`;
    usuarioDiv.appendChild(idadeP);

    const estadoP = document.createElement('p');
    estadoP.innerHTML = `<strong>Estado:</strong> <span>${cidade}/${sigla}</span>`;
    usuarioDiv.appendChild(estadoP);

    const emailP = document.createElement('p');
    emailP.innerHTML = `<strong>Email:</strong> <span>${email}</span>`;
    usuarioDiv.appendChild(emailP);

    const telefoneP = document.createElement('p');
    telefoneP.innerHTML = `<strong>Telefone:</strong> <span>${telefone}</span>`;
    usuarioDiv.appendChild(telefoneP);

    usuariosContainer.appendChild(usuarioDiv);
}


