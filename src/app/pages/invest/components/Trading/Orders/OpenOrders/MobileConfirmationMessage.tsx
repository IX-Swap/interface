import { Box, Grid } from '@mui/material'
import { needsConfirmation } from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrders.styles'
import { getExpiresOrderMessage } from 'helpers/dates'
import React from 'react'
import { OpenOTCOrder } from 'types/otcOrder'

export interface MobileConfirmationMessageProps {
  item: OpenOTCOrder
  color: string
}

export const MobileConfirmationMessage = ({
  item,
  color
}: MobileConfirmationMessageProps) => {
  const classes = useStyles()
  return (
    <>
      {needsConfirmation(item) && (
        <>
          <Grid
            item
            xs={12}
            key={`${item._id}-timeout`}
            style={{
              backgroundColor: color,
              textAlign: 'center'
            }}
          >
            <Box className={classes.infoCell}>
              <Box className={classes.separator} />
              {getExpiresOrderMessage(new Date(item.createdAt))}
            </Box>
          </Grid>
        </>
      )}
    </>
  )
}
