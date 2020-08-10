//importar depéndências do sqlite3
const sqlite3 = require("sqlite3").verbose()


//criar o objeto que irá fazer operações  no banco de dados

//isto é um constructor  ou uma classe
const db = new sqlite3.Database("./src/database/database.db")

//serve apra utilizar o require no arquivo server. Assim é possível pegar o banco de dados
module.exports = db

//utiliza o objeto de banco de dados , para nossa aplicações

db.serialize(() => {
    //criar uma tabela:
    //1- com comandos SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             image TEXT,
             name TEXT,
             adress TEXT,
             adress2 TEXT,
             state TEXT,
             city TEXT,
             items TEXT
        );
    `)

    //2- Inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items  
        ) VALUES (?,?,?,?,?,?,?,?);
    `

    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "PaperSider",
        "Guilherme Gemballa, Jardin América",
        "N°260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsert(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Item cadastrado com sucesso!")
        console.log(this)
    }

    //terceiro é uma função callback
    //db.run(query, values, afterInsert)

    //3- Cosultar  os dados da tabela
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)
    })

    //4- Deletar dados e uma tabela
    /*for (var i = 0; i < 100; i++) {
        db.run(`DELETE FROM places WHERE id = ?`, [i], function (err) {
            if (err) {
                return console.log(err)
            }
            console.log("registro deletado.")
        })
    }*/

})