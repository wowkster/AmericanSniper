import { Page } from 'puppeteer'
import NewEggSKU from '../product/sku/newEggSKU.js'
import SKU from '../product/sku/SKU.js'
import Store from './store.js'

export default class NewEgg extends Store {
    getProductUrl(sku: SKU): string {
        if (!(sku instanceof NewEggSKU))
            throw new Error(`Invalid SKU (${sku}) for New Egg. Expected NewEggSKU.`)

        return `https://www.newegg.com/p/${sku}`
    }

    get storeID(): string {
        return 'newegg'
    }
    get baseUrl(): string {
        throw new Error('Method not implemented.')
    }

    isLoggedIn(): boolean {
        return false
    }
    checkOut(): boolean {
        return false
    }
    placeOrder(): boolean {
        return false
    }
    addProductToCart(product: SKU, force?: boolean): boolean {
        return false
    }
    isInStock(page: Page, product: SKU): boolean {
        return false
    }
    async getPriceOfProduct(page: Page, product: SKU): Promise<number | null>  {
        return 0
    }
}
