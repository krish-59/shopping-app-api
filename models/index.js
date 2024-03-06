var mysql = require('mysql');

var database = mysql.createConnection({
    host:'127.0.0.1',
    user: 'vamsi',
    password: 'password',
    database: 'shoppingApp'
})

database.connect((err=>{
    if(err) throw err;
    console.log('Database Connected')
}));

const executeQuery =  (queryString) => {
    try {
        return new Promise(resolve=>{
            database.query(queryString, (err,result) => {
                if (err) throw err;
                let results  = JSON.parse(JSON.stringify(result))
                resolve(results)

            })
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    executeQuery
}