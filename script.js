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



    document.getElementById('city').innerText = usuario.results[0].location.city;
}