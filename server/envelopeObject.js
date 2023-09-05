export default class EnvelopObject{
    constructor(name, budgetedAmount){
        this.name = name;
        this.budgetedAmount = budgetedAmount;
        this.currentBalance = budgetedAmount;
    }
}

