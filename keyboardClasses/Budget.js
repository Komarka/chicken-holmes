class Budget {
    constructor(store) {
        this.store = store;
    }

    lowBudgetHandler() {
        this.store.budgetDiapasone = 500;
    }

    mediumBudgetHandler() {
        this.store.budgetDiapasone = 1000;
    }

    highBudgetHandler() {
        this.store.budgetDiapasone = 2000;
    }
}

module.exports = Budget;