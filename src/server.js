/*Criar o servidor é preciso criar módulos que já facilita bastante*/
/*baixamos os módulos com o comando npm install express*/

const express = require("express")
const server = express()

//Pegando banco de dados
const db = require("./database/db.js")
//configurar pasta public(adicionar os arquivos como se fosse comun para poder acessar os aqruivos de css...)
server.use(express.static("public"))


// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({
    extended: true
}))
//instalado o nunjucks(comando: npm install nunjucks) para template enginer
//utilizando template enginer
const nunjusck = require("nunjucks")
nunjusck.configure("src/views", {
    express: server,
    noCache: true
})


//Configurar caminho da aplicação
//página inicial
//req = requerimento
//res = resposta 
server.get("/", (req, res) => {
    //trocar o sendFile por render, porque ele passa pelo nunjucks()
    return res.render("index.html", {
        title: "Um título"
    })
})



//aqui está chamando a rota e não o arquivo 
server.get("/create-point", (req, res) => {

    console.log(req.query)
    return res.render("create-point.html")
})

// utilizando o post para que os dados não fiquem amostra
server.post("/savepoint", (req, res) => {
    //o corpo do formulário(todas as informações que o usuário digitou ou seleciono)
    console.log(req.body)


    // Inserir os dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items  
    ) VALUES (?,?,?,?,?,?,?);
`

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adressNumber,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsert(err) {
        if (err) {
            console.log(err)
          return res.send("Erro ao cadastrar!")
        }
        console.log("Item cadastrado com sucesso!")
        console.log(this)


        return res.render("create-point.html", {saved: true})
    }
    
    db.run(query, values, afterInsert)
})


server.get("/search-resultados", (req, res) => {


    const search = req.query.search
    if(search == ""){
        //pesquisa vazia
        return res.render("search-resultados.html", {total: 0 })
    }


    // pegar os dados do banco de dados para a aplicação ficar mais dinâmica
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        //contar o número de item no array do banco de dados
        const total = rows.length

        //mostrar a página html com os dados do banco de dados e a quantidade de itens no array
        return res.render("search-resultados.html", {
            places: rows,
            total: total
        })
    })
})




//ligar o servidor
server.listen(3000)

//Instalar o nodemon pelo comando npm install nodemon(para que não seja necessário desligar e ligar o servidor a todo o momento)