import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Box } from '@material-ui/core'
import DsoInformation from 'v1/components/Dso/DsoInformation'
import PageTitle from 'v1/components/PageTitle'

import { snackbarService } from 'uno-material-ui'
import { downloadFile, saveIssuance } from './modules/actions'

const DsoView = ({ assets }: any) => {
  const [action] = useState('create')
  const history = useHistory()

  const onClickDocument = async (document: Document) => {
    try {
      await downloadFile(document)
    } catch (error) {
      snackbarService.showSnackbar(error.message, 'error')
    }
  }

  const save = async (id, finalData) => {
    const payload = { ...finalData }
    payload.documents = (finalData.documents || []).map(a => a._id)
    const stringable = ['equityMultiple', 'investmentStructure']
    Object.keys(payload).forEach(key => {
      if (
        payload[key] !== null &&
        payload[key] !== undefined &&
        payload[key].toString().trim() === ''
      ) {
        payload[key] = stringable.includes(key) ? 'n/a' : null
      }
    })
    const isGood = await saveIssuance(payload)
    const sData = {
      type: 'error',
      message:
        'Failed to save digital security, please check if you have uploaded a logo and subscription document'
    }
    if (isGood) {
      sData.type = 'success'
      sData.message = 'Successfully saved digital security'
      history.goBack()
    }

    snackbarService.showSnackbar(sData.message, sData.type)
  }

  return (
    <Container>
      <PageTitle title='Create Digital' subPage />
      <Box mb={4} />
      <DsoInformation
        action={action}
        headerButtonAction={save}
        assets={assets}
        headerButtonText='Save'
        onClickDocument={onClickDocument}
      />
    </Container>
  )
}

export default DsoView
