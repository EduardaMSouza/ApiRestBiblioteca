// app.get('/livros', (req, res) => {
//     livros.find((err, livros) => {
//         res.status(200).json(livros)
//     })})



// const livros = [
//     {id: 1, "titulo": "senhor dos aneis"},
//     {id: 2, "titulo": "o hobbit"}
// ]


app.get('/', (req, res) => {
    res.status(200).send('curso de Node');
})


app.post('/livros', (req, res) =>{
    livros.push(req.body);
    res.status(201).send('livro adicionado');
})


app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivros(id);
    livros.splice(index, 1);
    res.send('livro removido com sucesso');
})

app.put('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivros(id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);
})

function buscaLivros(id){
    return livros.findIndex(livro => livro.id == id);
}