import React from 'react'
import { Box } from '@mui/material'
import { ReactComponent as USDIcon } from 'ui/UIKit/TablesKit/FirstTable/icons/usd.svg'
import { ReactComponent as SGDIcon } from 'ui/UIKit/TablesKit/FirstTable/icons/sgd.svg'
import { FirstTableItem } from 'ui/UIKit/TablesKit/FirstTable/FirstTable'
import { useStyles } from './utils.styles'
import { Status } from 'ui/Status/Status'

export const renderBalance = (price: string, item: FirstTableItem) => {
  return (
    <>
      {RenderBolderText(price)}&ensp;
      {item.currency}
    </>
  )
}

export const renderSGDPrice = (price: string) => {
  return <>{RenderBolderText(price)}&ensp; SGD</>
}

export const renderUSDPrice = (price: string) => {
  return <>{RenderBolderText(price)}&ensp; USD</>
}

export const renderCurrencyLabel = (currency: string) => {
  let Icon
  if (currency === 'USD') {
    Icon = USDIcon
  } else {
    Icon = SGDIcon
  }

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Icon style={{ marginRight: 16 }} />
      {RenderBolderText(currency)}
    </Box>
  )
}

export const RenderBolderText = (text: string) => {
  const classes = useStyles()
  return <b className={classes.bolder}>{text}</b>
}

export const renderStatus = (status: string) => {
  const getType = () => {
    switch (status) {
      case 'Connected':
        return 'approved'
      case 'In progress':
        return 'submitted'
      default:
        return 'rejected'
    }
  }

  return <Status type={getType()} label={status} />
}
