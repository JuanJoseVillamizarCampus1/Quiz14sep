const { response } = require("express");
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI)
//Funcion para obtener la coleccion
async function getCollection(collectionName) {
    try {
      await client.connect();
      const database = client.db('campusEps'); 
      const collection = database.collection(collectionName);
      return collection;
    } catch (error) {
      console.error('Error al obtener la colección:', error);
    }
  }
//Obtener todos los pacientes de manera alfabética.

async function ordenarPacientes(req, res=response) {
    try {
        const collection = await getCollection('usuario')    
        const documentos = await collection.find().sort({ usu_nombre: 1 }).toArray()
         res.json(documentos)
    } catch (error) {
        console.log(error);
        console.log('Error al obtener la conexion');
    }
}
async function cardiologos(req, res=response) {
    try {
        const collection = await getCollection('medico')    
        const documentos = await collection.find({"med_especialidad.es_nombre":"Cardiología"}).toArray();
         res.json(documentos)
    } catch (error) {
        console.log(error);
        console.log('Error al obtener la conexion');
    }
}
//Encontrar la próxima cita para un paciente en específico (por ejemplo, el paciente con user_id 1).

//Encontrar todos los pacientes que tienen citas con un médico en específico (por ejemplo, el médico con med_numMatriculaProfesional 1).
async function EncontarCitaCOnMeD(req, res=response) {
    try {
        const collection = await getCollection('cita')    
        const documentos = await collection.find({ cit_medico: "Dr. Juan Pérez" }, { cit_datosUsuario: 1 }).toArray();
         res.json(documentos)
    } catch (error) {
        console.log(error);
        console.log('Error al obtener la conexion');
    }
}

//Obtener todos los médicos con sus consultorios correspondientes.
async function consultorios(req, res=response) {
    try {
        const collection = await getCollection('medico')    
        const documentos = await collection.aggregate([
            {
              $project: {
                _id: 0,
                med_nombreCompleto: 1,
                consultorio_nombre: "$med_consultorio.cons_nombre",
                especialidad_nombre: "$med_especialidad.es_nombre"
              }
            }
          ]).toArray()
         res.json(documentos)
    } catch (error) {
        console.log(error);
        console.log('Error al obtener la conexion');
    }
}
//Encontrar la próxima cita para un paciente en específico (por ejemplo, el paciente con user_id 1).
async function encontrarCita(req, res=response) {
    try {
        const collection = await getCollection('cita')    
        const documentos = await collection.find(
            {
              cit_datosUsuario: "Usuario1",
              cit_fecha: { $gte: new Date() }
            }
          )
          .sort({ cit_fecha: 1 })
          .limit(1).toArray();
         res.json(documentos)
    } catch (error) {
        console.log(error);
        console.log('Error al obtener la conexion');
    }
}

  

module.exports = {
    ordenarPacientes,cardiologos,EncontarCitaCOnMeD,consultorios,encontrarCita
}