// src/types/data.d.ts

// 상품 카테고리:
// Category 타입 앨리어스는 문자열 유니언 타입을 참조한다.
// Type Alias는 TypeScript에서 새로운 타입 이름을 생성하고
// 그것이 특정 타입을 참조하도록 하는 방법이다.

export type Category = 'shoes'| 'clothes'| 'book'

// 상품 상태
export type Condition = 'new' | 'used'

// 사용자
export type User = {
    id: number
    username: string
    displayName: string
    email: string
    profileImageUrl: string
    description: string
}

// 상품: Category와 User를 속성의 타입으로 사용한다.
export type Product = {
    id: number
    category: Category
    title: string
    description: string
    imageUrl: string
    blurDataUrl: string
    price: number
    owner: User
}

// API 콘텍스트
export type ApiContext = {
    apiRootUrl: string
}