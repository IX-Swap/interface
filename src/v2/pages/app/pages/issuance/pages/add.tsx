import React from 'react'

import DigitalSecurity from '../../../components/digital-security/index'
import { Box, Container } from '@material-ui/core'
import PageTitle from '../../../components/page-title'
import { DsoRequest } from '../../../../../types/dso'
import { saveDso } from '../../../../../services/dso'
import { snackbarService } from 'uno-material-ui'
import storageHelper from '../../../../../helpers/storageHelper'
import { useHistory } from 'react-router-dom'

const DsoCreate = () => {
  const history = useHistory()

  const save = async (formValues: DsoRequest, isValid: boolean) => {
    if (!isValid) {
      snackbarService.showSnackbar('Unable to save, please fill out the fields and upload logo and a subscription document', 'error')
      return
    }

    const res = await saveDso(formValues, storageHelper.getUserId())
    if (res.status) {
      snackbarService.showSnackbar(`Successfully saved Digital Security (${formValues?.tokenSymbol})`)
      history.push('.')
      return
    }

    snackbarService.showSnackbar(`Unable to save ${formValues?.tokenSymbol}. (${res.message})`, 'error')
  }

  return (
    <Container>
      <PageTitle title='Create Dso' subPage />
      <Box mb={4} />
      <DigitalSecurity create buttonAction={save} buttonString='Save' />
    </Container>
  )
}

export default DsoCreate
