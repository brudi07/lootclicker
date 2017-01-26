class ArmorClass {

    //
    // Constructors
    //
    constructor(game) { }

    constructor(game, armorType) {
        this._armorType = armorType;
    }

    //
    // Property Getters/Setters
    //
    get armorType() {
        return _armorType;
    }

    set armorType(armorType) {
        if (armorType) {
            this._armorType = armorType;
        }
    }

    //
    // Methods
    //

}

export default ArmorClass;