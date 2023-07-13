
//Porte du serveur 
const PORT = 5000

import express from 'express'
import { temoignagetList, addTemoignage, updateTemoignage, deleteTemoignage, getTemoignageById } from './controllers/temoignage.js'

import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// Validations 
import TemoignageRules from './validations/temoignageValidations.js';

const app = express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Bienvenu cher utilisateur');
})

app.listen(5000, () => console.log(`Serveur running on port ${PORT}`))

app.get('/temoignages', temoignagetList)
app.post('/temoignages', TemoignageRules, addTemoignage)
app.put('/temoignages/:numero', updateTemoignage)
app.delete('/temoignages/:numero', deleteTemoignage)
app.get('/temoignages/:numero', getTemoignageById)
