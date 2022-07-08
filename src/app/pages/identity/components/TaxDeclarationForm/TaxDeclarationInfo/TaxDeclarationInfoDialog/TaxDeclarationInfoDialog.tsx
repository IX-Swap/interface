import React from 'react'
import { Dialog } from 'app/pages/identity/components/Dialog/Dialog'
import { Box, Typography } from '@mui/material'
import { TaxDeclarationInfoContent } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfoDialog/TaxDeclarationInfoContent'
import { TaxDeclarationInfoAction } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfoDialog/TaxDeclarationInfoActions'
import useStyles from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfoDialog/common.style'

export const TaxDeclarationInfoDialog = () => {
  const classes = useStyles()
  return (
    <Dialog
      scroll='body'
      maxWidth='xs'
      button={
        <Box className={classes.triggerButtonWrapper}>
          <Typography
            component='span'
            color='primary'
            className={classes.triggerButton}
          >
            Learn more
          </Typography>
        </Box>
      }
      title={<Box textAlign='start'>Why we need your Tax Declaration?</Box>}
      content={<TaxDeclarationInfoContent />}
      actions={<TaxDeclarationInfoAction />}
    />
  )
}
