import { StoreBrand } from "../stores/store";

export interface Config {
    products:      ConfigProduct[]
    max_instances: number
    mode:          'test' | 'production' | 'development'
    credentials:   Credentials
}

// "type" : creds
export interface Credentials {
    [key: string]: {
        email:    string
        password: string
    }
}

export interface ConfigProduct {
    name:        string
    store:       StoreBrand
    skus: string[]
    price:       {
        min: number;
        max: number;
    }
}