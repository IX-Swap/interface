import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, FormControl, Typography } from '@material-ui/core'
import { NumericInput, NumericInputProps } from 'components/form/NumericInput'

export const MinimumInvesmentField = (props: NumericInputProps) => {
  const { watch } = useFormContext()
  const tokenSymbol = watch('tokenSymbol')

  return (
    <Box display='flex' position='relative' width='100%'>
      {tokenSymbol !== null && tokenSymbol !== '' ? (
        <Box
          position='absolute'
          height='100%'
          paddingX={2}
          top={0}
          right={0}
          lineHeight='100%'
          bgcolor='#EDEDED'
          borderRadius='0 6px 6px 0'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Typography variant='subtitle1' color='textSecondary'>
            {tokenSymbol}
          </Typography>
        </Box>
      ) : null}

      <FormControl fullWidth>
        <NumericInput {...props} />
      </FormControl>
    </Box>
  )
}
