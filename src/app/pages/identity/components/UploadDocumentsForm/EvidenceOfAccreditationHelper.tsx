import { Typography } from '@mui/material'
import React from 'react'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/styles'

export const EvidenceOfAccreditationHelper = () => {
  const styles = useStyles()
  return (
    <Typography className={styles.text} textTransform='capitalize'>
      <span className={styles.blackText}>Net Personal Asset</span> Copy of
      latest investment portfolio holdings, e.g. bank, broker, <br /> fund
      manager account statements, copy bank statement, CPF statement
    </Typography>
  )
}
