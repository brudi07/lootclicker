class Attributes {

    //
    // Constructors
    //
    constructor(game) { }

    // Thoughts here: MV can use passed in objects ie. characterClass as a way to modify your base attributes
    // by setting the attribute modifier ie. strenghtModifier by using a specific characterClass
    // Example: if(characterClass == "Warrier") {_strengthModifier = 1.2}

    constructor(game, characterClass, name, hitPoints, characterLevel, experienceToNextLevel,
        baseStrength, strengthModifier, baseIntelligence, intelligenceModifier, baseDexterity, dexterityModifier) {
        this._characterClass = characterClass;
        this._name = name;
        this._hitPoints = hitPoints;
        this._characterLevel = characterLevel;
        this._experienceToNextLevel = experienceToNextLevel;

        this._baseStrength = baseStrength;
        this._strengthModifier = strengthModifier;
        this._baseIntelligence = baseIntelligence;
        this._intelligenceModifier = intelligenceModifier;
        this._baseDexterity = baseDexterity;
        this._dexterityModifier = dexterityModifier;
    }

    //
    // Property Getters/Setters
    //
    get characterClass() {
        return _characterClass;
    }

    set characterClass(characterClass) {
        if (characterClass) {
            this._characterClass = characterClass;
        }
    }

    get name() {
        return _name;
    }

    set name(name) {
        if (name) {
            this._name = name;
        }
    }

    get hitPoints() {
        return _hitPoints;
    }

    set hitPoints(hitPoints) {
        if (hitPoints) {
            this._hitPoints = hitPoints;
        }
    }

    get characterLevel() {
        return _characterLevel;
    }

    set characterLevel(characterLevel) {
        if (characterLevel) {
            this._characterLevel = characterLevel;
        }
    }

    get experienceToNextLevel() {
        return _experienceToNextLevel;
    }

    set experienceToNextLevel(experienceToNextLevel) {
        if (experienceToNextLevel) {
            this._experienceToNextLevel = experienceToNextLevel;
        }
    }

    get baseStrength() {
        return _baseStrength * _strengthModifier;
    }

    set baseStrength(baseStrength) {
        if (baseStrength) {
            this._baseStrength = baseStrength;
        }
    }

    get strengthModifier() {
        return _strengthModifier;
    }

    set strengthModifier(strengthModifier) {
        if (strengthModifier) {
            this._strengthModifier = strengthModifier;
        }
    }

    get baseIntelligence() {
        return _baseIntelligence * _intelligenceModifier;
    }

    set baseIntelligence(baseIntelligence) {
        if (baseIntelligence) {
            this._baseIntelligence = baseIntelligence;
        }
    }

    get intelligenceModifier() {
        return _intelligenceModifier;
    }

    set intelligenceModifier(intelligenceModifier) {
        if (intelligenceModifier) {
            this._intelligenceModifier = intelligenceModifier;
        }
    }

    get baseDexterity() {
        return _baseDexterity * _dexterityModifier;
    }

    set baseDexterity(baseDexterity) {
        if (baseDexterity) {
            this._baseDexterity = baseDexterity;
        }
    }

    get dexterityModifier() {
        return _dexterityModifier;
    }

    set dexterityModifier(dexterityModifier) {
        if (dexterityModifier) {
            this._dexterityModifier = dexterityModifier;
        }
    }

    // Methods

}

export default Attributes;