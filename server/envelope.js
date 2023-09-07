const express = require('express');
const envelopeRouter = express.Router();
import EnvelopeObject from './envelopeObject.js';

//Starting envelopes array with 3 different envelope
const envelopes = [
    new EnvelopeObject("Groceries", 300),
    new EnvelopeObject("Entertainment", 100),
    new EnvelopeObject("Utilities", 200)
];

envelopeRouter.param('name', (req, res, next, name) => {
    const envelope = envelopes.find(item => item.name === name);
    if(envelope){
        req.envelope = envelope;
        next();
    }
    else{
        res.status(404).send();
    }
});

envelopeRouter.get('/', (req, res) => {
    res.send(envelopes);
});

envelopeRouter.post('/', (req, res) => {
    const { name, budgetedAmount } = req.body;
    var doesExist = envelopes.find(item => item.name === name);
    if(!doesExist){
        const newEnvelope = new EnvelopeObject(name, budgetedAmount);
        envelopes.push(newEnvelope);   
        res.status(201).send(newEnvelope);
    }
    else{
        res.status(409).send('Bad Request. This envelope already exists')
    }
});

envelopeRouter.get('/:name', (req, res) => {
    res.send(req.envelope);
});

envelopeRouter.put('/:name', (req, res) => {
    const amountUsed = req.body.amountUsed;
    if (req.envelope.currentBalance >= amountUsed){
        req.envelope.currentBalance -= amountUsed;
        res.status(200).send(req.envelope);
    }
    else{
        res.status(400).send();
    }
});

envelopeRouter.delete('/:name', (req, res) => {
    envelopes.splice(envelopes.findIndex(item => item.name === req.envelope.name), 1);
    res.status(204).send();
});

module.exports  = envelopeRouter;