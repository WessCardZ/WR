# 1. Renomear funcoes e variaveis getOne=>getAPIUsuarios
# 2. Renomar carregarUsuario, montarTabelaUsuarios(pagina = 1)
    ```
        async function montarTabelaUsuarios(pagina = 1) {
            const response = await getAPIUsuarios(`https://randomuser.me/api/?nat=BR&results=15&seed=WR&page=${pagina}`);


            const usuariosList = response.results;
            const usuariosContainer = document.getElementById('usuarios-container');
            usuariosContainer.innerHTML = "";

            usuariosList.forEach(u => {
                adicionarUsuarioLinha(usuariosContainer, u, pagina);
            });

    ```
# 3. Ajustar index.html
```
    <footer>
        <button onclick="montarTabelaUsuarios(1)">1</button>
        <button onclick="montarTabelaUsuarios(2)">2</button>
        <button onclick="montarTabelaUsuarios(3)">3</button>
        <button onclick="montarTabelaUsuarios(4)">4</button>
        <button onclick="montarTabelaUsuarios(5)">5</button>
        <button onclick="montarTabelaUsuarios(6)">6</button>
    </footer>
```

# 4. Refatorar adicionarLinhas => adicionarUsuarioLinha
    ```

    async function adicionarUsuarioLinha(usuariosContainer, usuario, numeroPagina) {
    
    const nomeP = usuario.name.first;
    const nomeU = usuario.name.last;
    const nomeC = `${nomeP} ${nomeU}`;

    const foto = usuario.picture.large;
   
    ```