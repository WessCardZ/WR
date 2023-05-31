async function getOne(uri) {
    const encodedURI = encodeURI(uri);
    const response = await fetch(encodedURI);
    return await response.json();
}

async function carregarUsuario() {
    const fotos = await getOne('https://randomuser.me/api/?nat=BR');

    document.getElementById('foto').src = fotos.results[0].picture.large;
}