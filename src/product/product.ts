import { ConfigProduct } from '../config/config.js'
import { STORES } from '../index.js'
import Store, { ProductPrice, StoreBrand } from '../stores/store.js'
import createSKU from './sku/createSKU.js'
import SKU from './sku/SKU.js'

export default class Product {
    name: string
    skus: SKU[]
    storeBrand: StoreBrand
    minPrice: number
    maxPrice: number

    constructor(productInfo: ConfigProduct) {
        this.name = productInfo.name
        this.storeBrand = productInfo.store
        this.minPrice = productInfo.price.min
        this.maxPrice = productInfo.price.max

        this.skus = productInfo.skus.map(s => createSKU(s, this))
    }

    get store(): Store {
        return STORES[this.storeBrand]
    }

    isFairPrice(price: number | ProductPrice): boolean {
        if (typeof price === 'number') {
            if (price < this.minPrice || price > this.maxPrice) return false // Price is gauged or scam
        } else {
            // TODO - This will require a lot more logic
            if (price.min < this.minPrice || price.min > this.maxPrice) return false // Price is gauged or scam
        }

        return true
    }
}
