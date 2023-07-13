// import data from '../src/data.json'   //On ne peut pas import json avec module type
import { validationResult } from 'express-validator'
let data = [
    {
        "nom": "James",
        "email": "james@gmail.com",
        "numero": "5144769309",
        "message": "Great job!"
    },
    {
        "nom": "Youcef",
        "email": "youcef@gmail.com",
        "numero": "5145214712",
        "message": "DONE!"
    },
    {
        "nom": "John",
        "email": "john@gmail.com",
        "numero": "5142040088",
        "message": "NICE!",
    }
   
]
// console.log(data)

const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            // key: error.param,
            // message: error.msg
            [error.path]: error.msg
        };
    },
});

export const addTemoignage = (req, res) => {
    const temoignageInfo = req.body
    // console.log('Body',req)

    const errors = myValidationResult(req)  //Fonction modifiee
    // const errors = validationResult(req)  //Fonction modifiee
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    // data.push(studentInfo)
    data = [...data, temoignageInfo]
    res.status(200).json({ data, message: "Temoignage ajoute avec succes" })
}

export const temoignagetList = (req, res) => {
    if (!data.length) return res.status(200).json({ error: false, message: "Pas de temoignage dans la liste" })
    res.status(200).json({ error: false, data, message: "List des temoignages" })
}

export const updateTemoignage = (req, res) => {
    const { numero } = req.params
    const allTemoignageNumeros = data.map(temoignage => temoignage.numero)
    if (!numero) {
        res.status(422).json([{ key: 'numero', message: "Le numero de telephone est requis" }])
    } else if (!allTemoignageNumeros.includes(numero)) {
        res.status(404).json([{ key: 'numero', message: "Ce temoignage n'existe pas" }])
    }
    const updatedTemoignage = req.body
    const newData = data.map(temoignage => {
        if (temoignage.numero === numero) {
            return updatedTemoignage
        }
        return temoignage
    })

    data = [...newData]
    res.status(200).json({ message: "temoignage mis a jour correctement" })
}

export const deleteTemoignage = (req, res) => {
    const { numero } = req.params
    const allTemoignageNumeros = data.map(temoignage => temoignage.numero)
    if (!numero) {
        res.status(400).json({ error: true, message: "Le numero de telephone est requis" })
    } else if (!allTemoignageNumeros.includes(numero)) {
        res.status(404).json({ error: true, message: "Ce temoignage n'existe pas" })
    }
    const newData = data.filter(temoignage => temoignage.numero !== numero)
    data = newData
    res.status(200).json({ message: `Le temoignage avec le numero de telephone :${numero}, a ete supprime avec succes` })
}


export const getTemoignageById = (req, res) => {
    const { numero } = req.params
    const allTemoignageNumeros = data.map(temoignage => temoignage.numero)
    if (!numero) {
        res.status(400).json({ error: true, message: "Le numero de telephone est requis" })
    } else if (!allTemoignageNumeros.includes(numero)) {
        res.status(404).json({ error: true, message: "Ce temoignage n'existe pas" })
    }
    const thisTemoignage = data.find(temoignage => temoignage.numero === numero)
    res.status(200).json({ error: false, data: thisTemoignage })
}