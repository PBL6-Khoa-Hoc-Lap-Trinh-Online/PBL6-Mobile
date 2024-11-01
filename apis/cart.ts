import httpRequests from "@/utils/httpRequest"

export const addProductToCartApi = async (productId: number, cartQuantity: number) => {
    // return httpRequests.post(`/cart/add`, { product_id: 290, cart_quantity: 1 })
    //Axios post form data
    return httpRequests.post(`/cart/add`, { product_id: productId, cart_quantity: cartQuantity })
}

export const getCartApi = async () => {
    return httpRequests.get(`/cart`)
}

export const updateCartApi = async (productId: number, cartQuantity: number) => {
    return httpRequests.post(`/cart/update`, { cart_quantity: cartQuantity, product_id: productId })
}

export const deleteCardApi = async (ids_cart: number[]) => {
    return httpRequests.post(`/cart/delete-many`, { ids_cart: ids_cart })
}