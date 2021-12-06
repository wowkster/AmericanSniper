import { StoreBrand } from "../../stores/store"
import Product from "../product"

export default abstract class SKU {
    public identifier: string
    public product: Product

    constructor(identifier: string, product: Product) {
        if (!this.isValid(identifier)) throw new Error('Invalid SKU Identifier')

        this.identifier = identifier
        this.product = product
    }

    abstract isValid(id: string): boolean
    abstract get brand(): StoreBrand
}

SKU.prototype.toString = function () {
    return this.identifier
}
