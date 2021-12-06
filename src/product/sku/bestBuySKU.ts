import { StoreBrand } from '../../stores/store.js'
import SKU from './SKU.js'

export default class BestBuySKU extends SKU {
    isValid(id: string): boolean {
        return /([0-9]{6,8})/g.test(id)
    }

    get brand(): StoreBrand {
        return 'bestbuy'
    }
}
