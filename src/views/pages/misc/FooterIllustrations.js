// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import { staticImagePaths } from 'src/helpers/imageMapper'

// Styled Components
const MaskImg = styled(Image)(() => ({
  bottom: 0,
  zIndex: -1,
  height: 260,
  width: '100%',
  position: 'absolute'
}))

const FooterIllustrations = props => {
  // ** Props
  const { image } = props

  // ** Hook
  const theme = useTheme();

  const src = staticImagePaths[`misc-mask-${theme.palette.mode}`]

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  if (!hidden) {
    return (
      <>
        {!image ? (
          <MaskImg alt='mask' src={src} />
        ) : typeof image === 'string' ? (
          <MaskImg alt='mask' src={image} />
        ) : (
          image
        )}
      </>
    )
  } else {
    return null
  }
}

export default FooterIllustrations
