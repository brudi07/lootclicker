import { Enum } from 'enumify';

class CharacterType extends Enum { }

Color.initEnum(['WARRIOR', 'MAGE', 'ROGUE']);

// MV: Not positive if this export is necessary or works
export default CharacterType;