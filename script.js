async function getAPIUsuarios(uri) {
    const encodedURI = encodeURI(uri);
    const response = await fetch(encodedURI);
    return await response.json();
}

async function montarTabelaUsuarios(pagina = 1) {
    const response = await getAPIUsuarios(`https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=${pagina}`);

    const usuarioList = response.results.map(usuario => ({
        primeiroNome: usuario.name.first,
        ultimoNome: usuario.name.last,
        nomeCompleto: usuario.name.first + ' ' + usuario.name.last,
        fotoUsuario: usuario.picture.large,
        nacionalidade: usuario.nat,
        cpf: usuario.id.value,
        email: usuario.email,
        telefone: usuario.phone,
        idade: usuario.dob.age,
        genero: usuario.gender,
        cidade: usuario.location.city,
        estado: usuario.location.state
    }));
    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ""

    usuarioList.forEach((u, index) => {
        adicionarUsuarioLinha(usuariosContainer, u, index, pagina)
    });


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

function adicionarUsuarioLinha(usuariosContainer, usuario, index, numeroPagina) {
    const contagem = 1 + (numeroPagina - 1) * 15 + index;
    const sigla = converterEstado(usuario.estado);
    console.log(usuario);

    const usuarioDiv = document.createElement('div');
    usuarioDiv.className = 'usuario';

    const fotoImg = document.createElement('img');
    fotoImg.src = usuario.fotoUsuario;
    fotoImg.className = 'imagem'
    usuarioDiv.appendChild(fotoImg);

    const nomeCP = document.createElement('p');
    nomeCP.innerHTML = `<strong>Nome:</strong> <span>${usuario.nomeCompleto}</span>`;
    nomeCP.className = 'name'
    usuarioDiv.appendChild(nomeCP);

    const generoP = document.createElement('p');
    generoP.innerHTML = `<strong>Gênero:</strong> <span>${usuario.genero === 'male' ? 'Homem' : 'Mulher'}</span>`;
    generoP.className = 'genero'
    usuarioDiv.appendChild(generoP);

    const nacP = document.createElement('p');
    nacP.innerHTML = `<strong>Nacionalidade:</strong> <span>${usuario.nacionalidade}</span>`;
    nacP.className = 'nac'
    usuarioDiv.appendChild(nacP);

    const cpfP = document.createElement('p');
    cpfP.innerHTML = `<strong>CPF:</strong> <span>${usuario.cpf}</span>`;
    cpfP.className = 'cpf'
    usuarioDiv.appendChild(cpfP);

    const idadeP = document.createElement('p');
    idadeP.innerHTML = `<strong>Idade:</strong> <span>${usuario.idade}</span>`;
    idadeP.className = 'idade'
    usuarioDiv.appendChild(idadeP);

    const estadoP = document.createElement('p');
    estadoP.innerHTML = `<strong>Estado:</strong> <span>${usuario.cidade}/${sigla}</span>`;
    estadoP.className = 'estado'
    usuarioDiv.appendChild(estadoP);

    const emailP = document.createElement('p');
    emailP.innerHTML = `<strong>Email:</strong> <span>${usuario.email}</span>`;
    emailP.className = 'email'
    usuarioDiv.appendChild(emailP);

    const telefoneP = document.createElement('p');
    telefoneP.innerHTML = `<strong>Telefone:</strong> <span>${usuario.telefone}</span>`;
    telefoneP.className = 'telefone'
    usuarioDiv.appendChild(telefoneP);

    const contagemP = document.createElement('p');
    contagemP.innerHTML = `<strong>Posição:</strong> <span>${contagem}</span>`;
    contagemP.className = 'contagem';
    usuarioDiv.appendChild(contagemP)

    usuariosContainer.appendChild(usuarioDiv);
}

/*imagem,name,genero,nac,cpf,idade,estado,email,telefone*/