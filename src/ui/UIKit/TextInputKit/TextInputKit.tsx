import { Box } from '@mui/material'
import { Form } from 'components/form/Form'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { TextInputFields } from './TextInputFields'

export const TextInputKit = () => {
  return (
    <UIKitThemeWrapper>
      <Box
        sx={{
          p: 10,
          justifyContent: 'center',
          background: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <Form>
          <TextInputFields />
        </Form>
      </Box>
    </UIKitThemeWrapper>
  )
}
