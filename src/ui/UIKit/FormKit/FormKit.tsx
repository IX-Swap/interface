import { Grid, Box } from '@mui/material'
import { Form } from 'components/form/Form'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { DropzoneFields } from './DropzoneFields'

export const FormKit = () => {
  return (
    <UIKitThemeWrapper>
      <Box p={4}>
        <Grid container spacing={3}>
          <Grid item spacing={3} xs={12}>
            <Form
              defaultValues={{
                logo: ''
              }}
            >
              <DropzoneFields />
            </Form>
          </Grid>
        </Grid>
      </Box>
    </UIKitThemeWrapper>
  )
}
