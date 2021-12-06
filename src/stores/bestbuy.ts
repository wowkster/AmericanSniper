import { Page } from 'puppeteer'
import BestBuySKU from '../product/sku/bestBuySKU.js'
import SKU from '../product/sku/SKU.js'
import Store from './store.js'

export default class BestBuy extends Store {
    getProductUrl(sku: SKU): string {
        if (!(sku instanceof BestBuySKU))
        throw new Error(`Invalid SKU (${sku}) for Best Buy. Expected BestBuySKU.`)

        return `https://www.bestbuy.com/site/searchpage.jsp?st=${sku}`
    }

    get storeID(): string {
        return 'bestbuy'
    }
    get baseUrl(): string {
        return 'https://bestbuy.com'
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
