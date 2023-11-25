/* eslint-disable @typescript-eslint/ban-types */

/**
 * toPropValue에서 사용될 타입을 정의한다. Responsive 타입은 보통 CSS 속성값 또는
 *  브레이크 포인트에 대응하는 CSS 속성값의 객체를 지정할 수 있다.
 */


/**
 * Responsive 속성
 * CSS 속성값을 브레이크 포인트 별로 설정할 수 있다.
 */
export type ResponsiveProp<T> = {
    base?: T
    sm?: T
    md?: T
    lg?: T
    xl?: T
  }
  export type Responsive<T> = T | ResponsiveProp<T>
  
  /**
   * Flex
   */
  type SelfPosition =
    | 'center'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'self-end'
    | 'self-start'
    | 'start'
  
  type ContentPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'start'
  
  type ContentDistribution =
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'stretch'
  
  type CSSPropertyGlobals =
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
  
  export type CSSPropertyAlignItems =
    | CSSPropertyGlobals
    | SelfPosition
    | 'baseline'
    | 'normal'
    | 'stretch'
    // 코드 자동 보조
    | (string & {})
  
  export type CSSPropertyAlignContent =
    | CSSPropertyGlobals
    | ContentDistribution
    | 'center'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'start'
    | 'baseline'
    | 'normal'
    | (string & {})
  
  export type CSSPropertyJustifyItems =
    | CSSPropertyGlobals
    | SelfPosition
    | 'baseline'
    | 'left'
    | 'legacy'
    | 'normal'
    | 'right'
    | 'stretch'
    | (string & {})
  
  export type CSSPropertyJustifyContent =
    | CSSPropertyGlobals
    | ContentDistribution
    | ContentPosition
    | 'left'
    | 'normal'
    | 'right'
    | (string & {})
  
  export type CSSPropertyFlexWrap =
    | CSSPropertyGlobals
    | 'nowrap'
    | 'wrap'
    | 'wrap-reverse'
  
  export type CSSPropertyFlexDirection =
    | CSSPropertyGlobals
    | 'column'
    | 'column-reverse'
    | 'row'
    | 'row-reverse'
  
  export type CSSPropertyJustifySelf =
    | CSSPropertyGlobals
    | SelfPosition
    | 'auto'
    | 'baseline'
    | 'left'
    | 'normal'
    | 'right'
    | 'stretch'
    | (string & {})
  
  export type CSSPropertyAlignSelf =
    | CSSPropertyGlobals
    | SelfPosition
    | 'auto'
    | 'baseline'
    | 'normal'
    | 'stretch'
    | (string & {})
  
  /**
   * Grid
   */
  type GridLine = 'auto' | (string & {})
  
  export type CSSPropertyGridColumn =
    | CSSPropertyGlobals
    | GridLine
    | (string & {})
  
  export type CSSPropertyGridRow = CSSPropertyGlobals | GridLine | (string & {})
  
  export type CSSPropertyGridAutoFlow =
    | CSSPropertyGlobals
    | 'column'
    | 'dense'
    | 'row'
    | (string & {})
  
  export type CSSPropertyGridArea = CSSPropertyGlobals | GridLine | (string & {})
  


// // 반응형 디자인에 사용할 타입 설정

// /* eslint-disable @typescript-eslint/ban-types */

// import { theme } from 'themes'
// import type { ResponsiveProp, Responsive } from 'types'

// /* 
// CSS속성 값을 브레이크 포인트별로 설정할 수 있다.
// T는 CSS 속성값의 타입
// */

// type ResponsiveProp<T> = {
//     base?: T // 기본
//     sm?: T //   640px 이상
//     md?: T //   640px 이상
//     lg?: T  // 1024px 이상
//     xl?: T  // 1280px 이상
// }

// /**
//  * Responsive 타입은 Responsive 속성 또는 CSS 속성값
 
// Responsive<T>는 유니온 타입(Union Type)으로, T 타입 또는 ResponsiveProp<T> 타입의 값이 될 수 있다.
// 이 타입은 CSS 속성이 단일 값(T)이거나, 다양한 화면 크기에 따라 다른 값(ResponsiveProp<T>)을 가질 수 있음을 나타낸다.
// 예를 들어, Responsive<string>은 단일 문자열이거나, 다양한 화면 크기에 따른 문자열 값을 갖는 객체일 수 있다.
//  */
// type Responsive<T> = T | Responsive<T>


// /**
//  * Responsive 타입을 css 속성과 그 값으로 변환
//  * @param propKey CSS 속성
//  * @param prop Responsive 타입
//  * @returns CSS 속성과 그 값(e.g. background-colour: white;)
//  */
// function toPropValue<T>(propKey: string, prop?: Responsive<T>): string {
//     /**
//      * toPropValue('flex-direction', 'column'의 경우) >> flex-direction: column;의 문자열을 반환한다.
//      * toPropValue('flex-direction', {base: 'column', sm: 'row'})의 경우
//      * flex-direction: column;
//      * @media screen and (min-width: 640px) {
//      *  flex-direction: row;
//      * } 의 문자열을 반환한다.
//      */
// }

// interface ContainerProps {
//     flexDirection?: Responsive<string>
// }

// const Container = styled.section<ContainerProps>`
//     padding: 4em;
//     display: flex;
//     ${(props) => toPropValue('flex-direction', props.flexDirection)}
// `



// export default Page