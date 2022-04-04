import { Grid, Box } from '@mui/material'
import React from 'react'
import { TextInput } from 'ui/TextInput/TextInput'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'

export const TextInputKit = () => {
  return (
    <UIKitThemeWrapper>
      <Box
        sx={{
          p: 10,
          justifyContent: 'center',
          background: '#F0F2F7',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <Grid
          container
          spacing={2}
          alignContent='center'
          xs={12}
          direction='column'
        >
          <Grid item>
            <TextInput
              label={'Label'}
              placeholder='Placeholder'
              variant='filled'
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item>
            <TextInput
              label={'Label'}
              placeholder='Placeholder'
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item>
            <TextInput
              label={'Label'}
              loading
              placeholder='Placeholder'
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </UIKitThemeWrapper>
  )
}
