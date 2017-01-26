import { Enum } from 'enumify';

class ArmorType extends Enum { }

Color.initEnum(['LIGHT', 'MEDIUM', 'HEAVY']);

// MV: Not positive if this export is necessary or works
export default ArmorType;