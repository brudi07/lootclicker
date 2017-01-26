class Weapon {

    //
    // Constructors
    //
    constructor(game) { }

    // MV thoughts: can use passed in objects ie. weaponClass as a way to modify your base attributes
    // by setting the attribute modifier ie. damageModifier by using a specific weaponClass
    // Example: if(weaponClass == "Bastard Sword") {_damageModifier = 3.0}
    constructor(game, weaponClass, baseDamage, damageModifier) {
        this._weaponClass = weaponClass;
        this._baseDamage = baseDamage;
        this._damageModifier = damageModifier;
    }

    //
    // Property Getters/Setters
    //
    get weaponClass() {
        return _weaponClass;
    }

    set weaponClass(weaponClass) {
        if (weaponClass) {
            this._weaponClass = weaponClass;
        }
    }

    get baseDamage() {
        return _baseDamage;
    }

    set baseDamage(baseDamage) {
        if (baseDamage) {
            this._baseDamage = baseDamage;
        }
    }

    get damageModifier() {
        return _damageModifier;
    }

    set damageModifier(damageModifier) {
        if (damageModifier) {
            this._damageModifier = damageModifier;
        }
    }

    //
    // Methods
    //

}

export default Weapon;