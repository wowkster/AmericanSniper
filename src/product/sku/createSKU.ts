import Product from "../product.js"
import ASIN from "./ASIN.js"
import BestBuySKU from "./bestBuySKU.js"
import NewEggSKU from "./newEggSKU.js"
import SKU from "./SKU"

export default function createSKU(identifier: string, product: Product): SKU {
    switch (product.storeBrand) {
        case 'amazon':
            return new ASIN(identifier, product)
        case 'bestbuy':
            return new BestBuySKU(identifier, product)
        case 'newegg':
            return new NewEggSKU(identifier, product)
        default:
            throw new Error('Unsupported Store Type: ' + identifier)
    }
}
