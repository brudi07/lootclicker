class CharacterClass {

    //
    // Constructors
    //
    constructor(game) { }

    constructor(game, characterType) {
        this._characterType = characterType;
    }

    //
    // Property Getters/Setters
    //
    get characterType() {
        return _characterType;
    }

    set characterType(characterType) {
        if (characterType) {
            this._characterType = characterType;
        }
    }

    //
    // Methods
    //
}

export default CharacterClass;