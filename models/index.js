var mysql = require('mysql');

var database = mysql.createConnection({
    host: '127.0.0.1',
    user: 'vamsi',
    password: 'password',
    database: 'shoppingApp'
})

database.connect((err => {
    if (err) throw err;
    console.log('Database Connected')
}));

const executeQuery = async (queryString) => {
    try {
        const result = await new Promise((resolve, reject) => {
            database.query(queryString, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
        return result;
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    executeQuery
}