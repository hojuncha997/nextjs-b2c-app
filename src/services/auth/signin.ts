// src/services/auth/signin.ts
// types는 이후 정의
import {ApiContext, User} from '../../types'
// 앞에서 정의한 src/utils/index.ts로부터 읽는다.
import {fetcher} from '../../utils'

export type SigninParams = {
    username: string
    password: string
}

/**
 * 인증 API(로그인) 
 * @param context API 콘텍스트
 * @param params 파라미터
 * @returns 로그인 사용자
 */

const signin = async (
    context: ApiContext,
    params: SigninParams,
): Promise<User> => {
    return await fetcher(
        // signin 함수의 첫 번째 인수인 context는 API의 root url을 지정한다.
        //  루트 url을 고정하지 않는 것은 정적 사이트 생성 시 요청과 
        // 클라이언트 사이드로부터의 요청을 구분하기 위해서이다.
        `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(params),
        },
    )
}
export default signin