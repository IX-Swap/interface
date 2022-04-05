import { Box, Button } from '@mui/material'
import { Form } from 'components/form/Form'
import React from 'react'
import { FileUploadFields } from 'ui/UIKit/FileUploadKit/FileUploadFields'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import * as yup from 'yup'

export const FileUploadKit = () => {
  return (
    <UIKitThemeWrapper>
      <Form
        validationSchema={yup.object().shape({
          file: yup.mixed().required('Required'),
          image: yup.mixed().required('Required')
        })}
      >
        <FileUploadFields />
        <Box width='100%' mt={4} display='flex' justifyContent='flex-end'>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Box>
      </Form>
    </UIKitThemeWrapper>
  )
}
