'use client';

// ** React Imports
import { useEffect } from 'react';

// ** MUI Imports
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const Sidebar = props => {
  const { sx, show, direction, children, onOpen, onClose } = props

  useEffect(() => {
    if (show && onOpen) {
      onOpen()
    }

    if (show === false && onClose) {
      onClose()
    }
  }, [onClose, onOpen, show])

  return (
    <aside>
      <Box
        sx={{
          top: 0,
          height: '100%',
          minWidth: '14rem',
          zIndex: 'drawer',
          position: 'absolute',
          backgroundColor: '#12AB2C',
          transition: 'all 0.25s ease-in-out',
          backgroundColor: 'background.paper',
          ...(show ? { opacity: 1 } : { opacity: 0 }),
          ...(direction === 'right'
            ? { left: 'auto', right: show ? 0 : '-100%' }
            : { right: 'auto', left: show ? 0 : '-100%' }),
          ...sx
        }}
      >
        {children}
      </Box>
      <Button
        sx={{
          left: '14rem',
          position: 'absolute',
          backgroundColor: 'background.paper',
          transition: 'all 0.25s ease-in-out',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          textAlign: 'center',
          ...(direction === 'right'
            ? { left: 'auto', right: show ? '14rem' : 0 }
            : { right: 'auto', left: show ? '14rem' : 0 }),
        }}
        onClick={show ? onClose : onOpen}
      >
        {show ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>
    </aside >
  )
}

export default Sidebar

Sidebar.defaultProps = {
  direction: 'left'
}
