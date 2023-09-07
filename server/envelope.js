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
        req.name = name;
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
    const name = req.params.name;
    var envelope = envelopes.find(item => item.name === name);
    if (envelope){
        res.send(envelope);
    }
    else{
        res.status(404).send();
    }
});

envelopeRouter.put('/:name', (req, res) => {
    const name = req.params.name;
    const amountUsed = req.body.amountUsed;
    var envelope = envelopes.find(item => item.name === name);
    if(envelope){
        if (envelope.currentBalance >= amountUsed){
            envelope.currentBalance -= amountUsed;
            res.status(200).send(envelope);
        }
        else{
            res.status(400).send();
        }
    }
    else{
        res.status(404).send();
    }
});

envelopeRouter.delete('/:name', (req, res) => {
    const name = req.params.name;
    var envelope = envelopes.find(item => item.name === name);
    if(envelope){
        envelopes.pop(envelope);
        res.status(204).send();
    }
    else{
        res.status(404).send();
    }
});

module.exports  = envelopeRouter;