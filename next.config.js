/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: (() => {
    // styledComponents 활성화
    let compilerConfig = { styledComponents: true };

    if (process.env.NODE_ENV === "production") {
      compilerConfig = {
        ...(compilerConfig = {
          // 프로덕션 환경에서는 리액트 테스팅 라이브러리에서 사용하는 data-testid 속성 삭제
          reactRemoveProperties: { properties: ["^data-testid$"] },
        }),
      };
      return compilerConfig;
    }
  })(),

  // CORS에서 쿠키 전송을 피하기 위해 Next.js의 Rewrite 기능을 사용해 프락시를 설정.
  async rewrites() {
    return [
      {
        // e.g. /api/proxy
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
        // e.g. http://localhost:8000
        destination: `${process.API_BASE_URL}/:match*`,
      },
    ];
  },
};

module.exports = nextConfig;

/**
 * CORS(Cross-Origin Resource Sharing, 교차 출처 리소스 공유): 한 오리진의 웹애플리케이션에 대해 다른 오리진의 서버 접근을 HTTP요청에 따라 허가하는 구조를 의미
 * Rewrite: Next.js의 Rewrite 기능은 지정한 URL 패턴을 내부에서 다른 URL로 변환하는 기능이다.
 */
