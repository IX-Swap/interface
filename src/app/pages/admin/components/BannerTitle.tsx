import React, { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import EditIcon from '@mui/icons-material/Edit'
import { Grid, IconButton, Input, Typography } from '@mui/material'

export interface BannerTitleProps {
  text: string
  onChange: (value: string) => void
}

export const BannerTitle = ({ text, onChange }: BannerTitleProps) => {
  const { control } = useFormContext()
  const inputRef = useRef(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const onTitleBlurCapture = () => setIsEdit(false)
  const onTitleKeyUp = (evt: any) => {
    if (evt.keyCode === 13) {
      setIsEdit(false)
    }
  }
  const onEditButtonClick = async () => {
    setIsEdit(!isEdit)
    if (!isEdit) {
      // @ts-expect-error
      inputRef.current.focus()
    }
  }

  return (
    <Grid container alignItems={'center'}>
      <Grid
        item
        data-testid='firstGrid'
        style={{
          display: isEdit ? 'none' : 'flex',
          minHeight: 54,
          alignItems: 'center'
        }}
      >
        <Typography variant={'body1'}>{text}</Typography>
      </Grid>

      <Grid
        data-testid='secondGrid'
        item
        xs={8}
        style={{ display: !isEdit ? 'none' : 'block' }}
      >
        <TypedField
          label=''
          fullWidth
          type='text'
          name='title'
          control={control}
          component={Input}
          inputRef={inputRef}
          inputProps={{ 'data-testid': 'input' }}
          onKeyUp={onTitleKeyUp}
          onChange={value => onChange(value)}
          onBlurCapture={onTitleBlurCapture}
          style={{ marginTop: 0, minHeight: 54 }}
        />
      </Grid>
      <Grid item>
        <IconButton
          onClick={onEditButtonClick}
          data-testid={'button'}
          size='large'
        >
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}
