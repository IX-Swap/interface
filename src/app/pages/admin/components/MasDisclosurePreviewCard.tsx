import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { useTheme } from '@material-ui/core/styles'

export const MasDisclosurePreviewCard = () => {
  const theme = useTheme()

  return (
    <Card variant='outlined' style={{ width: '100%' }}>
      <CardContent style={{ width: '100%', padding: 0 }}>
        <Typography
          variant={'subtitle1'}
          style={{
            paddingLeft: theme.spacing(2.5),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(1)
          }}
        >
          Preview
        </Typography>
        <img
          width={'100%'}
          height={'auto'}
          src={require('assets/images/exchange-preview.png')}
          alt={'exchange-preview'}
        />
        <VSpacer size={'small'} />
        <Typography
          variant={'subtitle2'}
          style={{
            paddingLeft: theme.spacing(2.5),
            paddingRight: theme.spacing(3)
          }}
        >
          This is how a disclosure will be displayed on the exchange screen
        </Typography>
        <VSpacer size={'medium'} />
      </CardContent>
    </Card>
  )
}
