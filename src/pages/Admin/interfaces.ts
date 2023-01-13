export interface IProduct {
    id?: number | string
    category?: string,
    description?: string,
    image?: string,
    price?: number,
    rating?: { rate: number, count: number },
    title?: string
}

export interface IFirestoreProduct extends IProduct {
    rate?: number,
    count?: number
}

/*
*
    productName
    price
    product
    productAdjective
    productDescription
    productMaterial
* */