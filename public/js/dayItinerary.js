var DayItinerary = function() {
    this.hotel = {};
    this.restaurant = {};
    this.activity = {};
    this.order = {
        hotel: [],
        restaurant: [],
        activity: []
    }
}

DayItinerary.prototype.add = function(property, thing) {
    this[property][thing.name] = thing;
    this.order[property].push(thing.name);
}

DayItinerary.prototype.remove = function(property, name) {
    var idx = this.order[property].indexOf(name);
    if(idx !== -1){
        this.order[property].splice(idx, 1);
        delete this[property][name];
    }
}


