class EventType {
    constructor(store) {
        this.store = store;
    }

    setEventType(eventType) {
        this.store.eventType = eventType;
    }

    
}

module.exports = EventType;