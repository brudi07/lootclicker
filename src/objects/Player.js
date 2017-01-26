class Player {

  //
  // Constructors
  //
  constructor(game) { }

  constructor(game, characterClass, attributes, equipment, inventory) {
    // the main Player
    this._characterClass = characterClass;
    this._attributes = attributes;
    this._equipment = equipment;
    this._inventory = inventory;
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

  get attributes() {
    return _attributes;
  }

  set attributes(attributes) {
    if (attributes) {
      this._attributes = attributes;
    }
  }

  get equipment() {
    return _equipment;
  }

  set equipment(equipment) {
    if (equipment) {
      this._equipment = equipment;
    }
  }

  get inventory() {
    return _inventory;
  }

  set inventory(inventory) {
    if (inventory) {
      this._inventory = inventory;
    }
  }

  // Methods

}

export default Player;