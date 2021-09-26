class EventDate {
    constructor(store) {
        this.store = store;
    }

    setEventDate(eventDate) {
        this.store.eventDate = eventDate;
    }
 
}

module.exports = EventDate;