require('dotenv').config()
const Server = require('../backend/model/Server')
const servidor = new Server();
servidor.listen()