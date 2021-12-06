export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    definitions: {
        Credentials: {
            additionalProperties: {
                properties: {
                    email: {
                        type: 'string',
                    },
                    password: {
                        type: 'string',
                    },
                },
                type: 'object',
                required: ['email', 'password'],
            },
            type: 'object',
        },
        Product: {
            properties: {
                skus: {
                    items: {
                        type: 'string',
                    },
                    type: 'array',
                },
                name: {
                    type: 'string',
                },
                price: {
                    properties: {
                        max: {
                            type: 'number',
                        },
                        min: {
                            type: 'number',
                        },
                    },
                    type: 'object',
                    required: ['max', 'min'],
                },
                store: {
                    type: 'string',
                },
            },
            type: 'object',
            required: ['skus', 'name', 'price', 'store'],
        },
    },
    properties: {
        credentials: {
            $ref: '#/definitions/Credentials',
        },
        max_instances: {
            type: 'number',
        },
        mode: {
            enum: ['development', 'production', 'test'],
            type: 'string',
        },
        products: {
            items: {
                $ref: '#/definitions/Product',
            },
            type: 'array',
        },
    },
    type: 'object',
    required: ['credentials', 'max_instances', 'mode', 'products'],
}
