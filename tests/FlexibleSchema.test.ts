import FlexibleSchema from "../src/FlexibleSchema"
import { UnknownParameter } from "../src/Exceptions"

describe('Testing Flexible Schema Module', () => {

    test('Test Convert database interface without mapping', () => {
        const reg_attributes = ['name', 'currentPrice', 'offerPrice', 'quantity'];
        const data = {
            name: 'cocacola 2l un',
            prices: { 
                currentPrice: 10, 
                offerPrice: 8 
            }, 
            quantity: 29,
            customAttributes: [
                { name: 'ecommerceCurrentPrice', value: 12 }, 
                { name: 'ecommerceOfferPrice', value: 0 }, 
                { name: 'ecommerceName', value: 'Coca Cola Normal 2L' }
            ]
        };
        const result = { 
            name: 'cocacola 2l un', 
            currentPrice: 10, 
            offerPrice: 8, 
            quantity: 29,
            ecommerceCurrentPrice: 12, 
            ecommerceOfferPrice: 0, 
            ecommerceName: 'Coca Cola Normal 2L' 
        };
        
        const flexible_schema = new FlexibleSchema(reg_attributes);
        expect(flexible_schema.convert(data)).toStrictEqual(result);
    });

    test('Test Convert database interface with mapping', () => {
        const reg_attributes = [
            { name: 'name', map: 'name' },
            { name: 'currentPrice', map: 'currentPrice' },
            { name: 'offerPrice', map: 'currentPrice' },
            { name: 'quantity', map: 'quantity' }
        ];
        const data = {
            name: 'cocacola 2l un',
            prices: { 
                currentPrice: 10, 
                offerPrice: 8 
            }, 
            quantity: 29,
            customAttributes: [
                { name: 'ecommerceCurrentPrice', value: 12 }, 
                { name: 'ecommerceOfferPrice', value: 0 }, 
                { name: 'ecommerceName', value: 'Coca Cola Normal 2L' }
            ]
        };
        const result = { 
            name: 'cocacola 2l un', 
            currentPrice: 10, 
            offerPrice: 10,
            quantity: 29,
            ecommerceCurrentPrice: 12,
            ecommerceOfferPrice: 0,
            ecommerceName: 'Coca Cola Normal 2L'
        };
        
        const flexible_schema = new FlexibleSchema(reg_attributes);
        expect(flexible_schema.convert(data)).toStrictEqual(result);
    });

    test('Test Convert database interface inexistent parameter', () => {
        const reg_attributes = ['name', 'currentPrice', 'offerPrice', 'quantity', 'invalidParam'];
        const data = {
            name: 'cocacola 2l un',
            prices: { 
                currentPrice: 10, 
                offerPrice: 8 
            }, 
            quantity: 29,
            customAttributes: [
                { name: 'ecommerceCurrentPrice', value: 12 }, 
                { name: 'ecommerceOfferPrice', value: 0 }, 
                { name: 'ecommerceName', value: 'Coca Cola Normal 2L' }
            ]
        };
        const result = { 
            name: 'cocacola 2l un', 
            currentPrice: 10, 
            offerPrice: 8, 
            quantity: 29,
            ecommerceCurrentPrice: 12, 
            ecommerceOfferPrice: 0, 
            ecommerceName: 'Coca Cola Normal 2L' 
        };        
        
        const flexible_schema = new FlexibleSchema(reg_attributes);
        expect(() => flexible_schema.convert(data)).toThrow(UnknownParameter);
    });

    test('Test Convert database interface inexistent parameter with mapping', () => {
        const reg_attributes = [
            { name: 'name', map: 'name' },
            { name: 'currentPrice', map: 'currentPrice' },
            { name: 'offerPrice', map: 'currentPrice' },
            { name: 'quantity', map: 'invalidParam' }
        ];
        const data = {
            name: 'cocacola 2l un',
            prices: { 
                currentPrice: 10, 
                offerPrice: 8 
            }, 
            quantity: 29,
            customAttributes: [
                { name: 'ecommerceCurrentPrice', value: 12 }, 
                { name: 'ecommerceOfferPrice', value: 0 }, 
                { name: 'ecommerceName', value: 'Coca Cola Normal 2L' }
            ]
        };
        const result = { 
            name: 'cocacola 2l un', 
            currentPrice: 10, 
            offerPrice: 8, 
            quantity: 29,
            ecommerceCurrentPrice: 12, 
            ecommerceOfferPrice: 0, 
            ecommerceName: 'Coca Cola Normal 2L' 
        };        
        
        const flexible_schema = new FlexibleSchema(reg_attributes);
        expect(() => flexible_schema.convert(data)).toThrow(UnknownParameter);
    });
});