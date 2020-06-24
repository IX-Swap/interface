import React, { useRef, useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { uploadFile } from '../modules/actions'

const Uploader = ({ onUploadSuccess }: { onUploadSuccess: Function }) => {
  const inputRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [doc, setDoc] = useState(null)

  const handleChange = async () => {
    if (inputRef.current) {
      setUploading(true)
      const uploaded = await uploadFile({
        file: inputRef.current?.files?.[0],
        title: 'Signed Subscription Document',
        type: 'commitment'
      })

      onUploadSuccess(uploaded)
      setDoc(uploaded)
      setUploading(false)
    }
  }

  return (
    <Box mb={4}>
      <input
        ref={inputRef}
        id='upload'
        hidden
        type='file'
        onChange={handleChange}
        disabled={uploading}
      />
      {/* eslint-disable-next-line */}
      <label htmlFor='upload'>
        <Button
          component='span'
          variant='contained'
          fullWidth
          disabled={uploading}
        >
          {doc ? doc.originalFileName : 'Upload Signed Subscription Document'}
        </Button>
      </label>
    </Box>
  )
}

export default Uploader
