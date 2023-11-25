// 여기서 모아서 내보낸다.

import colors from './colors'
import fontSizes from './fontSizes'
import letterSpacings from './letterSpacings'
import lineHeights from './lineHeights'
import space from './space'

export const theme = {
  space,
  fontSizes,
  letterSpacings,
  lineHeights,
  colors,
} as const
