class City {
    constructor(store) {
        this.store = store;
    }

    setCity(cityName) {
        this.store.city = cityName;
    }

    
}

module.exports = City;