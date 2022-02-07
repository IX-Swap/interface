import React, { useRef } from 'react'
import { Button, Input } from '@mui/material'
import { useUploadVirtualAccountCSV } from 'app/pages/admin/hooks/useUploadVirtualAccountCSV'

export const UploadCSVButton = () => {
  const inputFile = useRef<HTMLInputElement>(null)
  const [uploadCSV, { isLoading }] = useUploadVirtualAccountCSV()

  const handleClick = () => {
    inputFile.current?.click()
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await uploadCSV(event.target.files)
    event.target.files = null
    event.target.value = ''
  }

  return (
    <>
      <Input
        style={{ display: 'none' }}
        type='file'
        id='virtualAccountCsv'
        inputRef={inputFile}
        onChange={handleChange}
      />
      <Button
        variant='outlined'
        color='primary'
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload CSV File'}
      </Button>
    </>
  )
}
