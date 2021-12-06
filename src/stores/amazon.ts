import { Page } from 'puppeteer'
import { BROWSER, CONFIG } from '..'
import ASIN from '../product/sku/ASIN.js'
import SKU from '../product/sku/SKU.js'
import Store from './store.js'

export default class Amazon extends Store {
    getProductUrl(sku: SKU): string {
        if (!(sku instanceof ASIN)) throw new Error(`Invalid SKU (${sku}) for Amazon. Expected ASIN.`)

        return `https://www.amazon.com/dp/${sku}`
    }
    get storeID(): string {
        return 'amazon'
    }
    get baseUrl(): string {
        return 'https://amazon.com'
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

    async getPriceOfProduct(page: Page, product: SKU): Promise<number | { min: number; max: number } | null> {
        // Get the price
        let priceRange = await page.evaluate(() => document.querySelector('.a-price-range')?.textContent)
        if (priceRange) {
            // Parse Price Strings from text content
            let cleanStr = priceRange.replaceAll(',', '')
            let allPriceStrs = cleanStr.match(/\$\d+.\d+/g) ?? []
            let filteredPrices = [...new Set([...allPriceStrs])]

            // Turn price strings into numbers
            let numberPrices = filteredPrices.map(p => parseFloat(p.substr(1)))

            return {
                min: numberPrices[0],
                max: numberPrices[1]
            }
        }

        let value = await page.evaluate(
            () => document.querySelector('.a-span12 > .a-price > span.a-offscreen')?.textContent
        )

        let numberStr = value?.replaceAll(',', '').substr(1) ?? ''
        return parseFloat(numberStr) || null
    }
}
