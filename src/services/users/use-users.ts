import useSWR from "swr";
import type { ApiContext, User } from "@/types/data";

export type UseUserProps = {
    // 취득할 사용자 ID
    id: number

    // 초기 상태
    initial?: User
}

export type UseUser = {
    // 취득할 사용자
    user?: User
    
    // 로드 플래그
    isLoading: boolean

    // 에러 플래그
    isError: boolean
}

/**
 * 사용자 API(개별취득)의 커스텀 훅
 * @param context API 컨텍스트
 * @return 사용자와 API 호출 상태
 */

const useUser = (
    context: ApiContext,
    {id, initial}: UseUserProps,
): UseUser => {
    const {data, error} = useSWR<User>(
        `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    )

    return {
        user: data ?? initial,
        isLoading: !error && !data,
        isError: !!error,
    }
}

export default useUser




/**

useSWR의 주요 기능:

데이터 Fetching:
웹 애플리케이션에서 
서버나 API로부터 데이터를 가져올 때 사용된다.

캐싱 및 재검증:
가져온 데이터를 캐시에 저장하고, 변경사항이 있을 때 
자동으로 재검증(revalidate)한다.

성능 최적화:
사용자 경험을 향상시키기 위해 캐시된 데이터를 먼저 보여주고,
배경에서 최신 데이터를 업데이트합니다.

반환값에 대한 설명:

data ?? initial 표현은 data 값이 undefined 또는 null인 경우
initial 값을 사용하라는 의미이다. 이는 useSWR에서 가져온 데이터가 없을 때 초기값(또는 기본값)을 제공한다.

isLoading: 데이터 로딩 중인지 여부를 나타낸다.
!error && !data 조건은 오류가 없고(!error), 동시에 데이터도 아직 로드되지 않았을 때(!data)
 참이 되어 로딩 상태를 나타낸다.
 
isError: 오류 발생 여부를 나타낸다. !!error는 오류 객체(error)가 존재할 경우 true를 반환하여 
오류가 발생했음을 나타낸다. 

isError: !!error 구문은 오류(error) 객체가 존재할 때 true를 반환합니다. 이는 JavaScript에서 두 개의 느낌표(!!)를 사용하여 
값을 불리언(boolean) 타입으로 변환하는 일반적인 방법이다.

동작 방식:
error 변수에 오류 객체가 할당되어 있으면, 이는 null이나 undefined가 아니기 때문에
첫 번째 느낌표(!)가 이를 false로 변환한다.

그 다음에 두 번째 느낌표(!)가 이 false를 다시 true로 변환한다.
결과적으로, 오류 객체가 존재하면 isError는 true가 된다.


*/