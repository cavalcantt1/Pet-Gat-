const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

const banco_de_dados = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'c@tolic@',
    database: 'petshop'
})

banco_de_dados.connect((err) => {
    if (err) {
        console.log("Erro na conexão com mysql")
    }
    else {console.log("Conexão estabelecida com mysql")}
})

app.post('/criar', (req, res) => {
    const Nome = req.body.nome_mm
    const CPF = req.body.cpf
    const Email = req.body.email
    const Telefone = req.body.telefone
    const values = {Nome, CPF, Email, Telefone}

    banco_de_dados.query ('INSERT INTO agendamentos(Nome, CPF, Email, Telefone) VALUES (?, ?, ?, ?)', values, (err, results) => {
        if (err) {
            res.send("Erro ao inserir dados no Mysql")
            console.log("Erro ao inserir dados")
        } else {
            res.send('Dados inseridos com sucesso')
            console.log("Dados inseridos com sucesso")
        }
    })
})


app.delete('/excluir', (req, res) => {
    const id = req.body.id
    banco_de_dados.query('D')
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/css/style.css'))
})

app.listen(port, () => {
    console.log("O servidor está no ar")
})