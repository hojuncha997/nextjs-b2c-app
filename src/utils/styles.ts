/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { theme } from '@/themes'
import type {ResponsiveProp, Responsive} from '@/types' 

// Theme의 타입
export type AppTheme = typeof theme
/**export type AppTheme = typeof theme에서 typeof theme은 
 * TypeScript에서 theme 객체의 타입을 가져온다. 
 * 이렇게 하면 AppTheme이라는 새로운 타입은 theme 객체가 가진 모든 속성과 그 타입들을 정확하게 반영한다. 
 * 즉, theme 객체 내에 정의된 속성들의 타입 구조를 AppTheme으로 복사하는 것이다. 
 * */


// Theme의 타입
/**
 * theme.space는 string[] 타입이므로, typeof theme.space는 string[] 타입을 의미한다 
 * keyof 연산자: keyof는 객체의 모든 키를 리터럴 타입의 유니온(합집합)으로 만들어낸다. string[] 타입의 경우,
 * 이는 배열의 인덱스에 해당하는 타입을 의미한다. 배열의 인덱스는 숫자이므로,
 * keyof typeof theme.space는 number 타입의 키를 나타내는 유니온 타입이 된다
 * 
 * SpaceThemeKeys 타입은 theme.space 배열의 인덱스에 해당하는 타입, 즉 number 타입의 키를 의미한다.
 * 이 타입을 사용하면 theme.space에 접근할 때, TypeScript는 인덱스가 올바른 타입인지 확인할 수 있다.
 * 예를 들어, theme.space[0] 또는 theme.space[1]과 같이 사용할 수 있으며, TypeScript는 이러한 접근이 유효한지 타입 체킹을 통해 확인한다.
 * 결론적으로, SpaceThemeKeys는 theme.space 배열의 인덱스를 나타내는 타입으로 사용되어, 배열에 안전하게 접근할 수 있도록 도와준다.
 * */
type SpaceThemeKeys = keyof typeof theme.space
type ColorThemeKeys = keyof typeof theme.colors
type FontSizeThemeKeys = keyof typeof theme.fontSizes
type LetterSpacingThemeKeys = keyof typeof theme.letterSpacings
type LineHeightThemeKeys = keyof typeof theme.lineHeights

// 각 Theme의 키의 타입

/**`export type Space = SpaceThemeKeys | (string & {})` 코드는 `Space`라는 새 타입을 정의하고, 
 * 이 타입은 `SpaceThemeKeys` 또는 `string` 타입의 값을 가질 수 있다.

1. **`SpaceThemeKeys`**: `SpaceThemeKeys` 타입은 `theme.space` 배열의 인덱스 타입을 의미한다. 
즉, `theme.space`에 접근하는 데 사용되는 숫자 인덱스가 여기에 해당한다.

2. **`(string & {})`**: 이 표현은 `string` 타입과 빈 객체 타입 `{}`의 교집합을 나타낸다. 
그런데 사실상, 이는 단순한 `string` 타입과 같다. 이렇게 복잡하게 표현하는 이유는 타입의 확장성을 고려하거나,
특정 타입 규칙을 만족시키기 위해서일 수 있다.
--> & {}을 입력하면 에디터의 자동완성을 활용할 수 있다.*

즉, `Space` 타입을 사용하면 `theme.space`의 인덱스(숫자)나 일반 문자열을 사용할 수 있다. 이 타입은 스타일 지정 시 `theme.space`에 정의된 값을 인덱스로 참조하거나,
직접 문자열 값을 지정하는 유연성을 제공한다. 예를 들어, `theme.space[1]`처럼 인덱스로 사용하거나,
`"10px"`처럼 문자열을 직접 쓸 수 있다.
 */

export type Space = SpaceThemeKeys | (string & {})
export type Color = ColorThemeKeys | (string & {})
export type FontSize = FontSizeThemeKeys | (string & {})
export type LetterSpacing = LetterSpacingThemeKeys | (string & {})
export type LineHeight = LineHeightThemeKeys | (string & {})

// 브레이크 포인트
/*
BREAKPOINTS 객체는 반응형 디자인에서 사용되는 미디어 쿼리의 브레이크 포인트를 정의한다.
 예를 들어, sm은 '640px'이상의 화면 크기를 나타낸다.

이 구문은 TypeScript의 인덱스 시그니처(index signature)를 사용한다.
 여기서 key는 객체의 속성 이름을 나타내는 변수명이고, 
 string은 그 속성의 타입을 나타낸다. 
 즉, 이 타입은 문자열 키에 문자열 값을 가지는 객체를 의미한다. */
const BREAKPOINTS: {[key: string]: string} = {
    sm: '640px', // 640px 이상
    md: '768px', // 768px 이상
    lg: '1024px', // 1024px 이상
    xl: '1280px', // 1280px 이상    
}

/**
 * Responsive 타입을 CSS 속성과 그 값으로 변환
 * @param propKey CSS 속성
 * @param prop Responsive 타입
 * @param theme AppTheme
 * @returns CSS 속성과 그 값(ex. background-color: white;)
 * 
 * 반응형 디자인 대응, Theme 대응을 위한 유틸리티 함수이다.
 * toPropValue의 
 * 첫 번째 인수에는 CSS 속성의 이름(magin 등)이 들어간다.
 * 두 번쨰 인수에는 Responsive, 
 * 세 번째 인수에는 Theme을 지정한다.
 * 
 * 이 함수를 사용하여 Theme에 설정된 값이나 브레이크 포인트 별 CSS 속성값으로 변환할 수있다.
 */
export function toPropValue<T>(
    propKey: string,
    prop?: Responsive<T>,
    theme?: AppTheme,
) {
    if(prop === undefined) return undefined

    if(isResponsivePropType(prop)) {
        const result = []

        for(const responsiveKey in prop) {
            if (responsiveKey === 'base') {
                // 기본 스타일
                result.push(
                    `${propKey}: ${toThemeValueIfNeeded (
                        propKey,
                        prop[responsiveKey],
                        theme,
                    )};`
                )
            } else if ( //responsiveKey가 base가 아닌 경우
            responsiveKey === 'sm' ||
            responsiveKey === 'md' ||
            responsiveKey === 'lg' ||
            responsiveKey === 'xl'
            ) {
                // 미디어 쿼리의 스타일
                const breakpoint = BREAKPOINTS[responsiveKey]
                const style = `${propKey}: ${toThemeValueIfNeeded(
                    propKey,
                    prop[responsiveKey],
                    theme,
                )};`
                result.push(`@media screen and (min-width: ${breakpoint}) {${style}}`)
            }
        }
        return result.join('\n')
    }
    return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`

}

const SPACE_KEYS = new Set([
    'margin',
    'margin-top',
    'margin-left',
    'margin-bottom',
    'margin-right',
    'padding',
    'padding-top',
    'padding-left',
    'padding-bottom',
    'padding-right',
  ])
  const COLOR_KEYS = new Set(['color', 'background-color'])
  const FONT_SIZE_KEYS = new Set(['font-size'])
  const LINE_SPACING_KEYS = new Set(['letter-spacing'])
  const LINE_HEIGHT_KEYS = new Set(['line-height'])

  
/**
 * Theme에 지정된 CSS 속성값으로 변환
 * @param propKey CSS 속성
 * @param value CSS 속성값
 * @param theme AppTheme
 * @returns CSS 속성값
 * 
 * 이 함수는 CSS 속성의 값을 theme 객체에서 찾아 치환한다. 
 * 예를 들어, margin이나 color 같은 키에 대해 theme의 space나 colors 값을 사용한다.
 */
function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
    if (
      theme &&
      theme.space &&
      SPACE_KEYS.has(propKey) &&
      isSpaceThemeKeys(value, theme)
    ) {
      return theme.space[value]
    } else if (
      theme &&
      theme.colors &&
      COLOR_KEYS.has(propKey) &&
      isColorThemeKeys(value, theme)
    ) {
      return theme.colors[value]
    } else if (
      theme &&
      theme.fontSizes &&
      FONT_SIZE_KEYS.has(propKey) &&
      isFontSizeThemeKeys(value, theme)
    ) {
      return theme.fontSizes[value]
    } else if (
      theme &&
      theme.letterSpacings &&
      LINE_SPACING_KEYS.has(propKey) &&
      isLetterSpacingThemeKeys(value, theme)
    ) {
      return theme.letterSpacings[value]
    } else if (
      theme &&
      theme.lineHeights &&
      LINE_HEIGHT_KEYS.has(propKey) &&
      isLineHeightThemeKeys(value, theme)
    ) {
      return theme.lineHeights[value]
    }
  
    return value
  }
  

  /**
   * 검사 함수들: 이 함수들은 주어진 값이
   *  ResponsiveProp<T> 타입이거나 특정 테마 키 타입인지 확인한다.
   * 이를 통해 theme 객체의 값이나 인덱스를 올바르게 참조하고 있는지 검증한다.
   */
  function isResponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
    return (
      prop &&
      (prop.base !== undefined ||
        prop.sm !== undefined ||
        prop.md !== undefined ||
        prop.lg !== undefined ||
        prop.xl !== undefined)
    )
  }
  
  function isSpaceThemeKeys(prop: any, theme: AppTheme): prop is SpaceThemeKeys {
    return Object.keys(theme.space).filter((key) => key == prop).length > 0
  }
  
  function isColorThemeKeys(prop: any, theme: AppTheme): prop is ColorThemeKeys {
    return Object.keys(theme.colors).filter((key) => key == prop).length > 0
  }
  
  function isFontSizeThemeKeys(
    prop: any,
    theme: AppTheme,
  ): prop is FontSizeThemeKeys {
    return Object.keys(theme.fontSizes).filter((key) => key == prop).length > 0
  }
  
  function isLetterSpacingThemeKeys(
    prop: any,
    theme: AppTheme,
  ): prop is LetterSpacingThemeKeys {
    return (
      Object.keys(theme.letterSpacings).filter((key) => key == prop).length > 0
    )
  }
  
  function isLineHeightThemeKeys(
    prop: any,
    theme: AppTheme,
  ): prop is LineHeightThemeKeys {
    return Object.keys(theme.lineHeights).filter((key) => key == prop).length > 0
  }
  



  /**
   * 
   * 위 코드는 컴포넌트에서 사용될 스타일을
   * 테마 기반으로 쉽게 적용할 수 있도록 돕는 유틸리티 함수와 타입을 제공한다. 
   * theme 객체를 사용하여 일관된 스타일을 적용하고, 반응형 디자인을 보다 쉽게 구현할 수 있게 해준다.
   * 
   */