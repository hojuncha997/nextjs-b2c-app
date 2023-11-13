// src/services/users/get-user.ts
import type {ApiContext, User} from '../../types/data'
import {fetcher} from '../../utils'

export type GetUserParams = {
    id: number
}

/**
 * 사용자 API(개별 취득)
 * @Param context API 콘텍스트
 * @Param params 파라미터
 * @returns 사용자
 */

const getUser = async (
    context: ApiContext,
    {id}: GetUserParams,
): Promise<User> => {
    // Promise<User>는 getUser 함수가 
    // User 타입의 값을 가진 프로미스(Promise)를 반환한다는 것을 의미

    return await fetcher(
        `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    )
}
export default getUser