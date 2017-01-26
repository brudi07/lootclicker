class WeaponClass {

    //
    // Constructors
    //
    constructor(game) { }

    constructor(game, weaponType) {
        this._weaponType = weaponType;
    }

    //
    // Property Getters/Setters
    //
    get weaponType() {
        return _weaponType;
    }

    set weaponType(weaponType) {
        if (weaponType) {
            this._weaponType = weaponType;
        }
    }

    //
    // Methods
    //

}

export default WeaponClass;