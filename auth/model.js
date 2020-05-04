const db = require('../database/dbConfig.js');


function findById(id) {
    return db('users').where({ id })
    .first();
}

function register(newUser) {
    return db('users').insert(newUser, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id)
    })
}

function login(info) {
    return db('users')
    .where(info)
}


module.exports = {
    findById,
    register,
    login
}