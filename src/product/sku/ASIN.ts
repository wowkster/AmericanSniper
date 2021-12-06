import { StoreBrand } from '../../stores/store.js'
import SKU from './SKU.js'

export default class ASIN extends SKU {
    isValid(id: string): boolean {
        return /^[A-Z0-9]{10}$/.test(id)
    }

    get brand(): StoreBrand {
        return 'amazon'
    }
}
