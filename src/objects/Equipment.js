class Equipment {

    //
    // Constructors
    //
    constructor(game) { }

    constructor(game, armor, weapons, equipmentSlots) {
        this._armor = armor;
        this._weapons = weapons;
        this._equipmentSlots = equipmentSlots;
    }

    //
    // Property Getters/Setters
    //
    get armor() {
        return _armor;
    }

    set armor(armor) {
        if (armor) {
            this._armor = armor;
        }
    }

    get weapons() {
        return _weapons;
    }

    set weapons(weapons) {
        if (weapons) {
            this._weapons = weapons;
        }
    }

    get equipmentSlots() {
        return _equipmentSlots;
    }

    set equipmentSlots(equipmentSlots) {
        if (equipmentSlots) {
            this._equipmentSlots = equipmentSlots;
        }
    }

    //
    // Methods
    //
}

export default Equipment;