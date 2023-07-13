import { body, param } from 'express-validator'

const temoignageRules = [
    body('email').isLength({ min: 5 }).withMessage('email doit contenir au moins 5 characteres'),
    body('nom').isLength({ min: 5 }).withMessage('Le nom doit contenir au moins 5 characteres'),
    body('numero').notEmpty().withMessage('Le code ne peut pas etre vide'),
    body('message').isLength({ min:4 }).withMessage('Le message doit contenir plus que 4 caracteres'),
    // param('numero').notEmpty().withMessage('Le parametre numero est requis'),
]

export default temoignageRules