const express = require("express")
const app = express()
const port = 5000

const path = require("path")
const caminho = path.join(__dirname, "pages")

const mysql = require("mysql")

app.use(
    express.urlencoded ({extended:true})
)

app.use(express.json())

app.post("/bebes/atualizar", (req,res) => {
    const id = req.body.idValor
    const nome = req.body.nome
    const sexo = req.body.sexo
    const mae = req.body.nomeMae

    const sql = `update bebe set nome_bebe = '${nome}', sexo = '${sexo}', 
    nome_mae = '${mae}' where id_bebe = ${id}`

    conn.query(sql, (erro) => {
        if(erro){
            console.log(erro)
        }
        else{
            res.status(200).sendFile(`${caminho}/home.html`)
        }
    })
})

app.get("/bebes/:id", (req, res) => {
    const id = req.params.id
    const sql = `select * from bebe where id_bebe = ${id}`
    conn.query(sql, (erro, dados) => {
        if(erro){
            console.log(erro)
        }
        else{
            res.json(dados[0])
        }
    })
})

app.get("/bebe/editar/:id", (req, res) => {
    res.status(200).sendFile(`${caminho}/editarbebe.html`)
})

app.get("/bebes/excluir/:id", (req, res) => {
    const id = req.params.id

    const sql = `delete from bebe where id_bebe = ${id}`

    conn.query(sql, (erro) => {
        if(erro){
            console.log(erro)
        }
        else{
            res.status(200).sendFile(`${caminho}/home.html`)
        }
    })
})

app.post("/bebe/insert", (req, res) => {
    const nome = req.body.nome
    const sexo = req.body.sexo
    const mae = req.body.nomeMae

    const sql = `insert into bebe (nome_bebe, sexo, nome_mae) 
    value ('${nome}', '${sexo}', '${mae}')`

    conn.query(sql, (erro, data) => {
        if(erro){
            console.log(erro)
        }
        else{
            res.status(201).redirect("/home")
        }
    })

})

app.get("/bebe/cadastrar", (req, res) => {
    res.status(200).sendFile(`${caminho}/cadastrarbebe.html`)
})

app.get("/bebes", (req, res) => {
    const sql = "select * from bebe"

    conn.query(sql, (erro, dados) => {
        if(erro){
            console.log(erro)
        }
        else{
            res.json(dados).sendFile(`${caminho}/home.html`)
        }
    })
})
app.get("/home", (req, res) => {
    res.status(200).sendFile(`${caminho}/home.html`)
})
app.get("/", (req, res) => {
    res.status(200).sendFile(`${caminho}/home.html`)
})



app.use((req, res, next) => {
    res.status(404).sendFile(`${caminho}/404.html`)
})

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodeBercario"
})

conn.connect((erro) => {
    if (erro) {
        console.log(erro)
    }
    else {
        console.log("Conectado")
        app.listen(port, () => {
            console.log(`Rodando:${port}`)
        })
    }
})