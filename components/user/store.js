const Model = require('./model')

function addUser(user) {
    const myUser = new Model(user)
    return myUser.save()
}

function getUsers() {
    return Model.find()
}

module.exports = {
    add: addUser,
    get: getUsers
}