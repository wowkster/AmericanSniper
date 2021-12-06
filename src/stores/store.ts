import { Page } from 'puppeteer'
import SKU from '../product/sku/SKU.js'

export interface CartProduct {
    SKU: SKU
    price: number
}

export class Cart {
    public items: CartProduct[]

    constructor() {
        this.items = []
    }
}

export interface ProductPrice {
    min: number
    max: number
}

export type StoreBrand = 'amazon' | 'bestbuy' | 'newegg'

export default abstract class Store {
    public cart: Cart

    constructor() {
        this.cart = new Cart()
    }

    /**
     * Return the base URL for all pages
     */
    abstract get baseUrl(): string
    
    /**
     * Return the URL of a product from its sku
     */
    abstract getProductUrl(sku: SKU): string

    /**
     * Return the storeID for identification ("amazon", "bestbuy")
     */
     abstract get storeID(): string

    /**
     * Checks to see if the site is logged in
     */
    abstract isLoggedIn(): boolean

    /**
     * Proceeds to checkout and fills in details required for order
     *
     * @returns True if succeeded, False if an error occured (not logged in or empty cart)
     */
    abstract checkOut(): boolean

    /**
     * Attempts to place an order
     *
     * If Test mode is enabled, it will not click the final order button
     *
     * @returns True if succeeded, false if an error occured or not logged in
     */
    abstract placeOrder(): boolean

    /**
     * Add a product to the Store's internal cart and does some checks first
     *
     * @param product Product or SKU
     * @param force Will add product to cart regardless of price
     *
     * @returns True if added successfully, False if an error occured,
     *  the item is not in stock, or the price is outside the allowed range
     */
    abstract addProductToCart(product: SKU, force?: boolean): boolean

    /**
     * Check if an item is in stock
     * @param product Product or SKU
     */
    abstract isInStock(page: Page, product: SKU): boolean

    /**
     * Lookup the price of the product using the website (assuming in stock)
     * @param product Product or SKU
     *
     * @returns Price of product. NUll if it does not exist, or is not in stock
     */
    abstract getPriceOfProduct(page: Page, product: SKU): Promise<number | ProductPrice | null> 
}
