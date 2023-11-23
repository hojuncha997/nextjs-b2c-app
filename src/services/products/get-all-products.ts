import type { ApiContext, Category, Condition, Product } from "@/types/data";
import { fetcher } from "@/utils";

export type GetAllProductsParams = {
    // 상품 카테고리
    category?: Category

    // 상품 상태
    conditions?: Condition[]

    // 소유한 사용자 ID
    userId?: number

    // 정렬할 키
    sort?: keyof Omit<Product, 'owner'>

    // 오름차순 내림차순
    order?: 'asc' | 'desc'

    // 취득 수
    limit?: number

    // 페이지 수
    page?: number
}

/**
 * 제품 API(목록 취득)
 * @param context API 컨텍스트
 * @param params 검색 조건
 * @returns 상품 목록
 */
// eslint-disable-next-line complexity
const getAllProducts = async (
    context: ApiContext,
    {
        category,
        conditions,
        userId,
        page,
        limit,
        sort = 'id',
        order = 'desc',
    }: GetAllProductsParams = {}, //기본값은 {}
): Promise<Product[]> => {
    const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`
    const params = new URLSearchParams()

    
  category && params.append('category', category)
  conditions &&
    conditions.forEach((condition) => params.append('condition', condition))
  userId && params.append('owner.id', `${userId}`)
  page && params.append('_page', `${page}`)
  limit && params.append('_limit', `${limit}`)
  sort && params.append('_sort', sort)
  order && params.append('_order', order)

  const query = params.toString()

  return await fetcher(query.length > 0 ? `${path}?${query}`: path, {
    headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        credentials: 'include',
    },
  })
}
export default getAllProducts

/**
 URLSearchParams의 역할:
URLSearchParams 객체는 URL의 쿼리 부분을 손쉽게 구성하고 조작할 수 있게 해준다.
이를 통해 각 검색 조건을 쿼리 문자열의 형태로 추가하고, 최종적으로 완성된 쿼리 문자열을 API 요청에 사용할 수 있다.
이 객체는 키-값 쌍을 쿼리 문자열 형태로 변환하는 메서드들을 제공한다.
예를 들어, params.append('key', 'value')는 URL에 ?key=value 형태로 추가합니다.
여러 조건이 추가될 경우 &를 사용하여 연결된다.
 */