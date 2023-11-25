import type { ApiContext, Product } from "@/types/data";
import { fetcher } from "@/utils";

export type AddProductsParams = {
    // 추가할 상품
    product: Omit<Product, 'id'>
}

/**
 * 제품 API(신규 추가)
 * @param context API 컨텍스트
 * @param params 신규 추가할 상품
 * @returns 신규 추가한 상품
 */

const addProduct = async (
    context: ApiContext,
    {product}: AddProductsParams,
): Promise<Product> => {
    return await fetcher(
        `${context.apiRootUrl.replace(/\/$/g, '')}/products`, {
            method: 'POST',
            headers: {
              Origin: '*',
              Accept: 'application/json',
              'Content-Type': 'application/json',
              credentials: 'include',
            },
            // 바디에 담아 보내기
            body: JSON.stringify(product),     
        }
    )
}
export default addProduct


/**

Omit 타입의 역할:
Omit<Type, Keys>는 TypeScript에서 사용되는 유틸리티 타입(Utility Type)이다.
이 타입은 기존의 타입(Type)에서 특정 키(Keys)를 제외한 새로운 타입을 생성한다.
즉, Omit을 사용하면 기존 타입의 일부 속성을 제외한 새로운 타입을 정의할 수 있다.

대개 id는 데이터베이스나 서버에서 자동으로 생성되는 값이기 때문에,
상품을 추가할 때 id를 제외한 나머지 정보만 제공하는 것이 일반적이다.

 */