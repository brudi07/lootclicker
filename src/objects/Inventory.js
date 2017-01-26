class Inventory {

    //
    // Constructors
    //
    constructor(game) { }

    // Inventory, gold
    constructor(game, gold, potions) {
        this._gold = gold;
        this._potions = potions;
    }

    //
    // Property Getters/Setters
    //
    get gold() {
        return _gold;
    }

    set gold(gold) {
        if (gold) {
            this._gold = gold;
        }
    }

    get potions() {
        return _potions;
    }

    set potions(potions) {
        if (potions) {
            this._potions = potions;
        }
    }

    //
    // Methods
    //
}

export default Inventory;