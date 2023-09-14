const routerPac = require('express').Router();
const {ordenarPacientes,cardiologos,EncontarCitaCOnMeD,consultorios,encontrarCita} = require('../controllers/pacientes')

routerPac.get('/orden',ordenarPacientes)
routerPac.get('/medicos',cardiologos)
routerPac.get('/cita',EncontarCitaCOnMeD)
routerPac.get('/consultorio',consultorios)
routerPac.get('/consulta',encontrarCita)

module.exports= routerPac;