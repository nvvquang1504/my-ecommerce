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

export interface IComponentWithFilterProps {
    filterType: string,
    productList?: IProduct[],
    checkList?: { [key: string]: boolean } | null,
    filterOpt?: { checkList?: { [key: string]: boolean } | null } | null,

}