import httpRequests from "@/utils/httpRequest"

// /products?search=Exo&page=2&paginate=5&brand_names[]=Pharimexco&product_price=below_100k&category_name=Thuốc cảm lạnh&brand_names[]=Hasan- Demarpharm
export const getProductsByCategoryIdApi = async (category_name: string) => {
    const response = await httpRequests.get(`/products?category_name=${category_name}`)
    return response
}

export const getProductByIdApi = async (productId: number) => {
    const response = await httpRequests.get(`/products/${productId}`)
    return response
}