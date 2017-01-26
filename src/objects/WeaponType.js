import { Enum } from 'enumify';

class WeaponType extends Enum { }

Color.initEnum(['SWORD', 'STAFF', 'DAGGER']);

// MV: Not positive if this export is necessary or works
export default WeaponType;