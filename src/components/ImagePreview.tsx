import React, { useState } from 'react'
import { Box, Modal, Button, ButtonProps } from '@mui/material'
import { Avatar, AvatarProps } from './Avatar'
import { ReactComponent as DownloadIcon } from 'assets/icons/download.svg'
import { Download } from 'ui/FileUpload/Download'

interface ImagePreviewProps extends AvatarProps {
  fileName: string
}

export const ImagePreview = (props: ImagePreviewProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 'none',
    rowGap: 10
  }

  const downloadButtonStyles = {
    color: 'white',
    display: 'flex',
    gap: 2,
    fontSize: '20px'
  }

  const DownloadButton = (props: ButtonProps) => (
    <Button variant='text' sx={downloadButtonStyles} {...props}>
      <DownloadIcon />
      Download
    </Button>
  )

  return (
    <>
      <Box onClick={handleOpen}>
        <Avatar {...props} />
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyles}>
          <Box sx={{ transform: 'scale(1.5)' }}>
            <Avatar {...props} />
          </Box>

          <Download
            documentId={props.documentId ?? ''}
            name={props.fileName}
            component={DownloadButton}
          />
        </Box>
      </Modal>
    </>
  )
}
