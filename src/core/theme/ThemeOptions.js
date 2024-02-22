import { deepmerge } from '@mui/utils'

import UserThemeOptions from 'src/layouts/UserThemeOptions'

import breakpoints from './breakpoints'
import overrides from './overrides'
import palette from './palette'
import shadows from './shadows'
import spacing from './spacing'
import typography from './typography'

const themeOptions = (settings, overrideMode) => {
  const { skin, mode, direction, themeColor } = settings

  const userThemeConfig = Object.assign({}, UserThemeOptions())

  const mergedThemeConfig = deepmerge(
    {
      breakpoints: breakpoints(),
      direction,
      components: overrides(settings),
      palette: palette(mode === 'semi-dark' ? overrideMode : mode, skin),
      ...spacing,
      shape: {
        borderRadius: 6
      },
      mixins: {
        toolbar: {
          minHeight: 64
        }
      },
      shadows: shadows(mode === 'semi-dark' ? overrideMode : mode),
      typography
    },
    userThemeConfig
  )

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...(mergedThemeConfig.palette
          ? mergedThemeConfig.palette[themeColor]
          : palette(mode === 'semi-dark' ? overrideMode : mode, skin).primary)
      }
    }
  })
}

export default themeOptions
