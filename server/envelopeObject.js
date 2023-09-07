export default class EnvelopeObject{
    constructor(name, budgetedAmount){
        this.name = name;
        this.budgetedAmount = budgetedAmount;
        this.currentBalance = budgetedAmount;
    }
}

