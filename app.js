const express = require('express');
var conexao = require('./conexaoBanco');

// Express aplicativo - configurando o acesso as funções
const app = express();
const bodyParser = require('body-parser');

// registrar a vizualização da engenharia ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

conexao.connect(function(error){
    if(error){
        console.error("Erro no banco de dados");
        process.exit();
    };
})

// ouvindo as requisições na porta
app.listen(3001, () => {
    console.log('Rodando')
})

// acessando a rota
app.get('/', (req, res) => {
    //passando parâmetros para o corpo do site
   /* const blogs = [
        { titulo: 'Charmander', conteudo: 'A ponta está constantemente em chamas e se for apagada pode resultar em sua morte.' },
        { titulo: 'Squirtle', conteudo: 'Seu casco reduz a resistência contra a água fazendo com que ele nade mais rápido' },
        { titulo: 'Bulbasaur', conteudo: 'Ao evoluir o bulbo começa a desabrochar até se tornar uma grande flor na evolução final.' }
    ];*/
    

const blogSql = "select * from blog";

    conexao.query(blogSql, function (error, result) {
        if (error) console.log(error);
        res.render('index', { blogs: result});

    })



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

app.post('/blog/criar', (req, res)=>{
    var titulo = req.body.titulo;
    var subtitulo = req.body.subtitulo;
    var conteudo = req.body.conteudo;

    var sql = "INSERT INTO blog(titulo, subtitulo, conteudo) VALUES (?, ?, ?)";
    conexao.query(sql, [titulo, subtitulo, conteudo], function(error){
        if (error) throw error;
        res.redirect('/');
    })
})

// erro 404
app.use((req, res) => {
    res.status(404).render('404', { titulo: '404' });
});