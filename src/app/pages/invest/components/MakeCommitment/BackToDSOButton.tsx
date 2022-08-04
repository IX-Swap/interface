import React from 'react'
import { Button, ButtonProps, Box } from '@mui/material'
import { generatePath, useParams } from 'react-router-dom'
import { Icon } from 'ui/Icons/Icon'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { InvestRoute } from 'app/pages/invest/router/config'

export const BackToDSOButton = (props: ButtonProps) => {
  const { isMobile } = useAppBreakpoints()
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()

  return (
    <Box height='100%' display='flex' alignItems='center'>
      <Button
        {...props}
        endIcon={isMobile ? undefined : <Icon name='arrow-right' />}
        startIcon={isMobile ? <Icon name='arrow-left' /> : undefined}
        href={generatePath(InvestRoute.view, { dsoId, issuerId })}
        sx={{
          pl: {
            xs: 0,
            md: 4
          }
        }}
      >
        Back to DSO page
      </Button>
    </Box>
  )
}
