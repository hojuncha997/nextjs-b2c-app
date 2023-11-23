import useSWR from 'swr'
import type { ApiContext, Category, Condition, Product } from "@/types/data";

export type UseSearchProps = {
    // 상품 카테고리
    category?: Category

    // 상품 상태
    conditions?: Condition[]

    // 소유 사용자 ID
    userId?: number

    // 정렬할 키
    sort?: keyof Omit<Product, 'owner'>

    // 오름차순 또는 내림차순
    order?: 'asc' | 'desc'

    // 초기 상태
    initial?: Product[]
}

export type UseSearch = {
    // 검색에 일치한 상품 리스트
    products: Product[]

    // 로드 플래그
    isLoading: boolean
    
    // 에러 플래그
    isError: boolean
}

/**
 * 제품 API(목록 취득)의 커스텀훅
 * @param context API 컨텍스트
 * @param params 검색 조건
 * @returns 상품 목록과 API 호출 상태
 */

const useSearch = (
    context: ApiContext,
    {
        category,
        userId,
        conditions,
        initial,
        sort = 'id',
        order = 'desc',
    }: UseSearchProps = {},
): UseSearch => {

    const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`
    const params = new URLSearchParams()

    category && params.append('category', category)
    userId && params.append('owner.id', `${userId}`)
    conditions &&
      conditions.forEach((condition) => params.append('condition', condition))
    sort && params.append('_sort', sort)
    order && params.append('_order', order)
    
    const query = params.toString()

    const { data, error } = useSWR<Product[]>(
      query.length > 0 ? `${path}?${query}` : path,
    )

    return {
        products: data ?? initial ?? [],
        isLoading: !error && !data,
        isError: !!error
    }
}
export default useSearch

/**
 URLSearchParams의 역할:
URLSearchParams 객체는 URL의 쿼리 부분을 손쉽게 구성하고 조작할 수 있게 해준다.
이를 통해 각 검색 조건을 쿼리 문자열의 형태로 추가하고, 최종적으로 완성된 쿼리 문자열을 API 요청에 사용할 수 있다.
이 객체는 키-값 쌍을 쿼리 문자열 형태로 변환하는 메서드들을 제공한다.
예를 들어, params.append('key', 'value')는 URL에 ?key=value 형태로 추가합니다.
여러 조건이 추가될 경우 &를 사용하여 연결된다.

Omit 타입의 역할:
Omit<Type, Keys>는 TypeScript에서 사용되는 유틸리티 타입(Utility Type)이다.
이 타입은 기존의 타입(Type)에서 특정 키(Keys)를 제외한 새로운 타입을 생성한다.
즉, Omit을 사용하면 기존 타입의 일부 속성을 제외한 새로운 타입을 정의할 수 있다.

대개 id는 데이터베이스나 서버에서 자동으로 생성되는 값이기 때문에,
상품을 추가할 때 id를 제외한 나머지 정보만 제공하는 것이 일반적이다.

keyof:
keyof 타입 연산자는 주어진 타입의 모든 공개 키(속성명)를 문자열 리터럴 타입의 유니온(합집합)으로 반환한다.
예를 들어, Product가 { id: number; name: string; price: number; owner: string; }와 같은 타입을
가지고 있다면, keyof Product는 'id' | 'name' | 'price' | 'owner'와 같은 타입 된다.
 */
