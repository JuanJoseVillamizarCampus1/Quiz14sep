const { MongoClient} = require('mongodb');

//Conexion con base de datos
const client = new MongoClient(process.env.MONGO_URI)

const dbconnection = async () =>{
    try {
    //Metodo de conexion al servidor
    await client.connect();
    console.log('Base de datos conectada al servidor');
    } catch (error) {
        console.log(error);
        throw new  Error('Error al conectar la database')
    }
}
module.exports= {dbconnection}