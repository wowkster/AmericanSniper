import Amazon from './amazon.js'
import BestBuy from './bestbuy.js'
import NewEgg from './newegg.js'
import Store, { StoreBrand } from './store.js'

export function createStore(storeType: StoreBrand): Store {
    switch (storeType) {
        case 'amazon':
            return new Amazon()
        case 'bestbuy':
            return new BestBuy()
        case 'newegg':
            return new NewEgg()
        default:
            throw new Error('Unsupported Store Type: ' + storeType)
    }
}
