async function getAPIUsuarios(uri) {
    const encodedURI = encodeURI(uri);
    const response = await fetch(encodedURI);
    return await response.json();
}

async function montarTabelaUsuarios(pagina = 1) {
    const response = await getAPIUsuarios(`https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=${pagina}`);

    const usuarioList = response.results.map(u => ({
        primeiroNome: u.name.first,
        ultimoNome: u.name.last,
        nomeCompleto: u.name.first + ' ' + u.name.last,
        fotoUsuario: u.picture.large,
        nacionalidade: u.nat,
        cpf: u.id.value,
        email: u.email,
        telefone: u.phone,
        idade: u.dob.age,
        genero: u.gender,
        cidade: u.location.city,
        estado: u.location.state
    }));
    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ""

    usuarioList.forEach((u, contar) => {
        adicionarUsuarioLinha(usuariosContainer, u, contar, pagina)
    });

}

function adicionarUsuarioLinha(usuariosContainer, usuario, contarPagina, numeroPagina) {
    const contagem = 1 + (numeroPagina - 1) * 15 + contarPagina;
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

function converterEstado(estados) {

    const estadoFormatado = estados.toLowerCase();

    if (estadoFormatado === 'mato grosso') return 'MT';
    if (estadoFormatado === 'paraíba') return 'PB';
    if (estadoFormatado === 'amapá') return 'AP';
    if (estadoFormatado === 'roraima') return 'RR';

    let primeiraLetra = estadoFormatado.charAt(0);
    let segundaLetra = estadoFormatado.charAt(1);

    if (estadoFormatado.includes(" ")) {
        const espaco = estadoFormatado.indexOf(" ");
        segundaLetra = estadoFormatado.charAt(espaco + 1);
    }

    return `${primeiraLetra.toUpperCase()}${segundaLetra.toUpperCase()}`;

}

/*imagem,name,genero,nac,cpf,idade,estado,email,telefone*/