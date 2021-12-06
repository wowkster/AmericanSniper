import { StoreBrand } from '../../stores/store.js'
import SKU from './SKU.js'

export default class NewEggSKU extends SKU {
    isValid(id: string): boolean {
        return /([A-Z0-9]{14})/g.test(id)
    }

    get brand(): StoreBrand {
        return 'newegg'
    }
}
