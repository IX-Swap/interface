import { Button, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from 'ui/CompactTable/ExpandButton.styles'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { Serialized } from 'types/base'

export interface ExpandButtonProps<T extends Serialized> {
  item: T
}

export const ExpandButton = <T extends Serialized>({
  item
}: ExpandButtonProps<T>) => {
  const context = useContext(ActiveElementContext)
  const handleClick = () => {
    context?.toggleRow(item._id)
  }
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <Button
        onClick={() => handleClick()}
        fullWidth
        className={classes.iconButton}
      >
        <Icon name='more-horizontal' />
      </Button>
    </Grid>
  )
}
