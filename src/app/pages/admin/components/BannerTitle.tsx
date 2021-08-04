import React, { useState } from 'react'
import { Grid, IconButton, Input, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

export interface BannerTitleProps {
  text: string
  onChange: (value: string) => void
}

export const BannerTitle = ({ text, onChange }: BannerTitleProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  return (
    <Grid container alignItems={'center'}>
      <Grid item>
        {!isEdit ? (
          <Typography variant={'body1'}>{text}</Typography>
        ) : (
          <Input
            type={'text'}
            value={text}
            fullWidth
            onChange={event => onChange(event.target.value)}
          />
        )}
      </Grid>
      <Grid item>
        <IconButton onClick={() => setIsEdit(!isEdit)}>
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}
