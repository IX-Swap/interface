import { Box } from '@mui/material'
import { Form } from 'components/form/Form'
import React from 'react'
import { DatepickerFields } from 'ui/UIKit/Datepicker/DatepickerFields'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'

export const DatepickerKit = () => {
  return (
    <UIKitThemeWrapper>
      <Box p={2}>
        <Form>
          <DatepickerFields />
        </Form>
      </Box>
    </UIKitThemeWrapper>
  )
}
