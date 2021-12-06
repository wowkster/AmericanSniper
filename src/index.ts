import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import Ajv from 'ajv'
import CONFIG_SCHEMA from './config/config_schema.js'
import { Config } from './config/config.js'
import { createStore } from './stores/createStore.js'
import Product from './product/product.js'

// Create Schema Validator
const ajv = new Ajv()

// Parse config file
export const CONFIG = JSON.parse(await fs.readFile('config.json', 'utf-8')) as Config

// Validate JSON Config

const validate = ajv.compile(CONFIG_SCHEMA)
if (!validate(CONFIG)) {
    console.log('*'.repeat(20))
    console.log('CONFIG SCHEMA ERRORS')
    console.log('*'.repeat(20))
    console.log(validate.errors)
    process.exit(-1)
}

export const BROWSER = await puppeteer.launch({ headless: true })

// Create one and only one type of store based on the products in the config
// i.e. If there are only multiple amazon products create 1 amazon store. If
// There are a few amazon products and a fe best buy products, create 1 amazon
// and 1 best buy store instance
export const STORES = {
    amazon: createStore('amazon'),
    bestbuy: createStore('bestbuy'),
    newegg: createStore('newegg'),
}

console.log(STORES)

// For all the products in the config, create a product instance of them
export const PRODUCTS: Product[] = CONFIG.products.map(p => new Product(p))

console.log(PRODUCTS)

await Promise.all(PRODUCTS.map(async p => {
    let {store} = p

    await Promise.all(p.skus.map(async s => {
        const page = await BROWSER.newPage()
        await page.setViewport({
            width: 1920,
            height: 1080
        })
        await page.goto(store.getProductUrl(s))

        await page.screenshot({ path: `screenshots/${p.storeBrand}/${s}.png` })

        let price = await store.getPriceOfProduct(page, s)
        console.log(`Price of "${p.name}": ${price}`)

        if (!price) return // If price was not found (not listed)

        if (!p.isFairPrice(price)) return // Price is scam of gauged

        // see if is in stock (may or may not be redundant)

        // add item to cart
    }))
}))

await BROWSER.close()
