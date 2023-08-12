import express from 'express';
import db from './config/dbconnect.js'
import livros from './models/Livro.js';
import routes from './routes/index.js';



db.on("error", console.log.bind("error", 'erro de conexão'));
db.once("open", ()=>{
    console.log('conexão com o banco feita');
})

const app = express();


app.use(express.json());

routes(app);


app.get('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivros(id);
    res.json(livros[index]);
})





export default app;