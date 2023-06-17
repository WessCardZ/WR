async function getOne(uri) {
    const encodedURI = encodeURI(uri);
    const response = await fetch(encodedURI);
    return await response.json();
}

async function carregarUsuario() {
    const usuario = await getOne('https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=1');

    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ""
    for (let i = 0; i < usuario.results.length; i++) {
        adicionarLinhas(usuariosContainer, usuario, i, 1);
    }
}

async function carregarSegundaPagina() {
    const segundaPagina = await getOne('https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=2');

    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ""
    for (let i = 0; i < segundaPagina.results.length; i++) {
        adicionarLinhas(usuariosContainer, segundaPagina, i, 2);
    }
}

async function carregarTerceiraPagina() {
    const terceiraPagina = await getOne('https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=3');

    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ""
    for (let i = 0; i < terceiraPagina.results.length; i++) {
        adicionarLinhas(usuariosContainer, terceiraPagina, i, 3);

    }
}
async function carregarQuartaPagina() {
    const usuario = await getOne('https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=4');

    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ""
    for (let i = 0; i < usuario.results.length; i++) {
        adicionarLinhas(usuariosContainer, usuario, i, 4);
    }
}

async function carregarQuintaPagina() {
    const segundaPagina = await getOne('https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=5');

    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ""
    for (let i = 0; i < segundaPagina.results.length; i++) {
        adicionarLinhas(usuariosContainer, segundaPagina, i, 5);
    }
}

async function carregarSextaPagina() {
    const terceiraPagina = await getOne('https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=6');

    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ""
    for (let i = 0; i < terceiraPagina.results.length; i++) {
        adicionarLinhas(usuariosContainer, terceiraPagina, i, 6);

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

async function adicionarLinhas(usuariosContainer, usuario, i, numeroPagina) {
    const nomeP = usuario.results[i].name.first;
    const nomeU = usuario.results[i].name.last;
    const nomeC = `${nomeP} ${nomeU}`;

    const foto = usuario.results[i].picture.large;
    const nac = usuario.results[i].nat;
    const cpf = usuario.results[i].id.value;
    const email = usuario.results[i].email;
    const telefone = usuario.results[i].phone;
    const idade = usuario.results[i].dob.age;
    const genero = usuario.results[i].gender;
    const cidade = usuario.results[i].location.city;
    const estado = usuario.results[i].location.state;
    const contagem =  1 + (numeroPagina - 1) * 15 + i;
    const sigla = converterEstado(estado);

    const usuarioDiv = document.createElement('div');
    usuarioDiv.className = 'usuario';

    const fotoImg = document.createElement('img');
    fotoImg.src = foto;
    fotoImg.className = 'imagem'
    usuarioDiv.appendChild(fotoImg);

    const nomeCP = document.createElement('p');
    nomeCP.innerHTML = `<strong>Nome:</strong> <span>${nomeC}</span>`;
    nomeCP.className = 'name'
    usuarioDiv.appendChild(nomeCP);

    const generoP = document.createElement('p');
    generoP.innerHTML = `<strong>Gênero:</strong> <span>${genero === 'male' ? 'Homem' : 'Mulher'}</span>`;
    generoP.className = 'genero'
    usuarioDiv.appendChild(generoP);

    const nacP = document.createElement('p');
    nacP.innerHTML = `<strong>Nacionalidade:</strong> <span>${nac}</span>`;
    nacP.className = 'nac'
    usuarioDiv.appendChild(nacP);

    const cpfP = document.createElement('p');
    cpfP.innerHTML = `<strong>CPF:</strong> <span>${cpf}</span>`;
    cpfP.className = 'cpf'
    usuarioDiv.appendChild(cpfP);

    const idadeP = document.createElement('p');
    idadeP.innerHTML = `<strong>Idade:</strong> <span>${idade}</span>`;
    idadeP.className = 'idade'
    usuarioDiv.appendChild(idadeP);

    const estadoP = document.createElement('p');
    estadoP.innerHTML = `<strong>Estado:</strong> <span>${cidade}/${sigla}</span>`;
    estadoP.className = 'estado'
    usuarioDiv.appendChild(estadoP);

    const emailP = document.createElement('p');
    emailP.innerHTML = `<strong>Email:</strong> <span>${email}</span>`;
    emailP.className = 'email'
    usuarioDiv.appendChild(emailP);

    const telefoneP = document.createElement('p');
    telefoneP.innerHTML = `<strong>Telefone:</strong> <span>${telefone}</span>`;
    telefoneP.className = 'telefone'
    usuarioDiv.appendChild(telefoneP);

    const contagemP = document.createElement('p');
    contagemP.innerHTML = `<strong>Posição:</strong> <span>${contagem}</span>`;
    contagemP.className = 'contagem';
    usuarioDiv.appendChild(contagemP)


    usuariosContainer.appendChild(usuarioDiv);
}


/*imagem,name,genero,nac,cpf,idade,estado,email,telefone*/