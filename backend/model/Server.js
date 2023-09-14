const express = require('express')
const {dbconnection} = require('../database/config')
const routerPac = require('../routes/pacientes.routes')
class Server {
    constructor(){
        this.app= express()
        this.port = process.env.PORT
        this.connect()
        this.middlewares()
        this.path = {
            pacientes:'/api/pacientes'
        }
        this.routes()
    }
    async connect(){
        await dbconnection()
    }
    middlewares(){
        this.app.use(express.json())
    }
    routes(){
        this.app.use(this.path.pacientes,routerPac)
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor escuchando el puerto ${this.port}`);
        })
    }
}
module.exports= Server;