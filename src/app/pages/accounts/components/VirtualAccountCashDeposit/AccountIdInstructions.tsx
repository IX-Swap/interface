import React, { useState } from 'react'
import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import { useStyles } from './shared.styles'
import { ReactComponent as AlertIcon } from 'assets/icons/alert-circle.svg'
import { useServices } from 'hooks/useServices'
import { useSnackbar } from 'hooks/useSnackbar'

export const AccountIdInstructions = () => {
  const { paper, instructions, accountId, copied } = useStyles()
  const theme = useTheme()

  const { storageService } = useServices()
  const user: any = storageService.get('user')
  const reference = user?.accountId

  const [hasCopied, setHasCopied] = useState(false)
  const snackbar = useSnackbar()
  const handleCopy = async () => {
    await navigator.clipboard.writeText(reference ?? '')
    setHasCopied(true)
    snackbar.showSnackbar('Copied to clipboard', 'success')

    setTimeout(() => {
      setHasCopied(false)
    }, 5000)
  }

  return (
    <Paper className={paper}>
      <Box className={instructions}>
        <Box mb={3} display={'flex'} gap={1}>
          <Box color={theme.palette.primary.main}>
            <AlertIcon />
          </Box>
          <Box>
            <Typography fontWeight={600} mt={0.5}>
              IMPORTANT:
            </Typography>
            <Typography
              color={theme.palette.text.secondary}
              fontWeight={400}
              mt={1.5}
            >
              Please make sure to input the{' '}
              <Typography display={'inline'} fontWeight={600}>
                Account ID
              </Typography>{' '}
              provided below into the{' '}
              <Typography display={'inline'} fontWeight={600}>
                reference field
              </Typography>{' '}
              when you deposit the money.
            </Typography>
          </Box>
        </Box>

        <Box className={[accountId, hasCopied ? copied : ''].join(' ')}>
          <Typography fontWeight={600} fontSize={'18px'}>
            {reference}
          </Typography>
          <Button
            sx={{
              padding: 0,
              background: 'none !important',
              color: 'inherit !important'
            }}
            onClick={handleCopy}
            disabled={hasCopied}
          >
            {!hasCopied ? 'Copy' : 'Copied'}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
