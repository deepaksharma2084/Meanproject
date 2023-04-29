export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    password:string,
    email:string
}

export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number,
    quantity: undefined|number,
    productId:undefined|number,
}

export interface cart {
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id: number | undefined,
    quantity: number | undefined,
    userId:number,
    productId:number
}

export interface priceSummery{
    price:number,
    tax:number,
    total:number,
}

export interface order {
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}