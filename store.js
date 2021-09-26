class Store {
    constructor() {
        this._budgetDiapasone = 0;
        this._city = '';
        this._eventType = '';
        this._chunkIndex = 0;
        this._events = [];
        this._eventDate = null;
    }

    get budgetDiapasone() {
        return this._budgetDiapasone;
    }

    set budgetDiapasone(budgetDiapasone) {
        this._budgetDiapasone = budgetDiapasone;
    }

    get city() {
        return this._city;
    }

    set city(city) {
        this._city = city;
    }

    get eventType() {
        return this._eventType;
    }

    set eventType(eventType) {
        this._eventType = eventType;
    }

    get chunkIndex() {
        return this._chunkIndex;
    }

    set chunkIndex(chunkIndex) {
        this._chunkIndex = chunkIndex;
    }

    get events() {
        return this._events;
    }

    set events(events) {
        this._events = events;
    }

    get eventDate() {
        return this._eventDate;
    }

    set eventDate(eventDate) {
        this._eventDate = eventDate;
    }
}

module.exports = Store;