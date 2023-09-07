const express = require('express');
const envelopeRouter = express.Router();
import EnvelopeObject from './envelopeObject.js';

//Starting envelopes array with 3 different envelope
const envelopes = [
    new EnvelopeObject("Groceries", 300),
    new EnvelopeObject("Entertainment", 100),
    new EnvelopeObject("Utilities", 200)
];

envelopeRouter.get('/', (req, res) => {
    res.send(envelopes);
});

envelopeRouter.post('/', (req, res) => {
    const { name, budgetedAmount } = req.body;
    const newEnvelope = new EnvelopeObject(name, budgetedAmount);
    envelopes.push(newEnvelope);   
    res.status(201).send(newEnvelope);
});

module.exports  = envelopeRouter;