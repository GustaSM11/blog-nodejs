const express = require('express');

// Express aplicativo - configurando o acesso as funções
const app = express();

// registrar a vizualização da engenharia ejs
app.set('view engine', 'ejs');

// ouvindo as requisições na porta
app.listen(3001, () => {
    console.log('Rodando')
})

// acessando a rota
app.get('/', (req, res) => {
    //passando parâmetros para o corpo do site
    const blogs = [
        { titulo: 'Charmander', conteudo: 'A ponta está constantemente em chamas e se for apagada pode resultar em sua morte.' },
        { titulo: 'Squirtle', conteudo: 'Seu casco reduz a resistência contra a água fazendo com que ele nade mais rápido' },
        { titulo: 'Bulbasaur', conteudo: 'Ao evoluir o bulbo começa a desabrochar até se tornar uma grande flor na evolução final.' }
    ];



    res.render('index', { titulo: 'Home' , blogs});
});

// sendFile = Método do express que envia arquivos HTML para a tela

// nova rota
app.get('/sobre', (req, res) => {
    res.render('sobre', { titulo: 'Sobre' });
})

// redirecionamento de página
app.get('/sobrenos', (req, res) => {
    res.redirect('/sobre');
})

// rota da criação do conteúdo

app.get('/blog/criar', (req, res) => {
    res.render('criar', { titulo: 'Criar novo Blog' });
})

// erro 404
app.use((req, res) => {
    res.status(404).render('404', { titulo: '404' });
});