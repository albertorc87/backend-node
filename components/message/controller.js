const { socket } = require('../../socket')
const store = require('./store')
const config = require('../../config')

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if(!chat || !user || !message) {
            console.error('[messageControler] No hay usuario o mensaje')
            reject('Los datos son incorrectos')
            return false
        }

        let fileUrl = ''

        if(file) {
            fileUrl = `${config.host}:${config.port}${config.publicRoute}/files/${file.filename}`
        }
        const fullMessage = {
            chat,
            user,
            message,
            date: new Date(),
            file: fileUrl
        }

        store.add(fullMessage)

        socket.io.emit('message', fullMessage)

        resolve(fullMessage)
    })

}

function getMessages(filterChat) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterChat));
    })
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if(!id || !message) {
            reject('Invalid data')
            return false
        }
        const result = store.updateText(id, message)
        resolve(result)
    })
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if(!id) {
            reject('Invalid data')
            return false
        }
        store.remove(id)
            .then(() => {
                resolve()
            })
            .catch(e => {
                reject(e)
                return false
            })
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}