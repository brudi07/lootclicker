class Armor {

    //
    // Constructors
    //
    constructor(game) { }

    // MV thoughts: can use passed in objects ie. armorClass as a way to modify your base attributes
    // by setting the attribute modifier ie. defenseModifier by using a specific weaponClass
    // Example: if(armorClass == "Heavy Armor") {_defenseModifier = 5.0}

    constructor(game, armorClass, baseDefense, defenseModifier) {
        this._armorClass = armorClass;
        this._baseDefense = baseDefense;
        this._defenseModifier = defenseModifier;
    }

    //
    // Property Getters/Setters
    //
    get armorClass() {
        return _armorClass;
    }

    set armorClass(armorClass) {
        if (armorClass) {
            this._armorClass = armorClass;
        }
    }

    get baseDefense() {
        return _baseDefense;
    }

    set baseDefense(baseDefense) {
        if (baseDefense) {
            this._baseDefense = baseDefense;
        }
    }

    get defenseModifier() {
        return _defenseModifier;
    }

    set defenseModifier(defenseModifier) {
        if (defenseModifier) {
            this._defenseModifier = defenseModifier;
        }
    }

    //
    // Methods
    //
}

export default Armor;