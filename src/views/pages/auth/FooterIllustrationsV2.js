// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import { staticImagePaths } from 'src/helpers/imageMapper'

// Styled Components
const MaskImg = styled(Image)(({ theme }) => ({
  bottom: 0,
  height: 300,
  width: '100%',
  position: 'absolute',
  [theme.breakpoints.down(1540)]: {
    height: 250
  }
}))

const FooterIllustrationsV2 = props => {
  // ** Props
  const { image, height, className } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const src = staticImagePaths[`misc-mask-${theme.palette.mode}`];

  if (!hidden) {
    return (
      <>
        {!image ? (
          <MaskImg
            alt='mask'
            className={className}
            {...(height && { height })}
            src={src}
          />
        ) : typeof image === 'string' ? (
          <MaskImg alt='mask' src={image} className={className} {...(height && { height })} />
        ) : (
          image
        )}
      </>
    )
  } else {
    return null
  }
}

export default FooterIllustrationsV2
