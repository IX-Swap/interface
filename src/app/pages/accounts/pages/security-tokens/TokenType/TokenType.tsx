import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'
import {
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormControl
} from '@mui/material'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { TypedField } from 'components/form/TypedField'
import { useStyles } from './TokenType.styles'
import { useSearchQuery } from 'hooks/useSearchQuery'

export const TOKEN_TYPES = [
  { name: 'Security Token', value: 'Security' },
  { name: 'Stablecoin', value: 'Stablecoin' }
]

export const TokenType = () => {
  const classes = useStyles()
  const { control, watch, setValue } = useFormContext()
  const tokenType = watch('tokenType')

  const searchQuery = useSearchQuery()
  const type = searchQuery.get('type')

  useEffect(
    () => setValue('tokenType', type ?? 'Security'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type]
  )

  return (
    <FormControl>
      <Grid container alignItems='center'>
        <Grid item xs>
          <TypedField
            customRenderer
            component={RadioGroup}
            name='tokenType'
            control={control}
            defaultValue={''}
          >
            <Grid container display={'flex'} gap={1.5}>
              {TOKEN_TYPES.map(type => {
                const isSelected = tokenType === type.value

                return (
                  <Grid
                    item
                    flexGrow={1}
                    flexBasis={0}
                    className={cn(classes.button, {
                      [classes.active]: isSelected
                    })}
                    key={type.value}
                    // onClick={() => setValue('tokenType', type.value)}
                  >
                    <FormControlLabel
                      sx={{
                        width: '100%',
                        '& .MuiFormControlLabel-label': { width: '100%' }
                      }}
                      label={
                        <Box className={classes.labelWrapper}>
                          <Box className={classes.label}>
                            <Typography
                              color={isSelected ? 'inherit' : 'tooltip.color'}
                            >
                              {type.name}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      value={type.value}
                      control={<UIRadio />}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </TypedField>
        </Grid>
      </Grid>
    </FormControl>
  )
}
